import React, { useState, useEffect, useCallback } from 'react';
import WelcomeLogin from '../components/WelcomeLogin';
import StatusBar from '../components/StatusBar';
import NumberInput from '../components/NumberInput';
import MultiplierGraph from '../components/MultiplierGraph';
import CurrentRound from '../components/CurrentRound';
import SpeedSlider from '../components/SpeedSlider';
import Ranking from '../components/Ranking';
import Chat from '../components/Chat';
import AnimatedNumber from '../components/AnimatedNumber';
import styles from '../styles/Root.module.scss';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Update with your server URL

interface Player {
  name: string;
  points: number;
  multiplier: number;
}

interface GraphDataPoints {
  name: string;
  multiplier?: number;
}

const defaultData: GraphDataPoints[] = [
  { name: '0' },
  { name: '1' },
  { name: '2' },
  { name: '3' },
  { name: '4' },
  { name: '5' },
  { name: '6' },
  { name: '7' },
  { name: '8' },
  { name: '9' },
  { name: '10' },
];

const roundDefault: Player[] = [
  { name: 'You', points: 0, multiplier: 0 },
  { name: 'CPU 1', points: 0, multiplier: 0 },
  { name: 'CPU 2', points: 0, multiplier: 0 },
  { name: 'CPU 3', points: 0, multiplier: 0 },
  { name: 'CPU 4', points: 0, multiplier: 0 },
];

const generateData = (): GraphDataPoints[] => {
  const data: GraphDataPoints[] = [];
  const lastResult = parseFloat((Math.random() * 11).toFixed(2)); // Random value for the last round
  data.push({ name: '10', multiplier: lastResult });

  // Generate the initial rounds based on the random value of the last round
  let currentResult = lastResult;
  for (let i = 9; i >= 0; i--) {
    currentResult *= 0.85; // Decrement factor for a downward curve
    data.push({ name: `${i}`, multiplier: parseFloat(currentResult.toFixed(2)) });
  }

  return data.reverse(); // Reverse the data array to start with the first round
};

const getRandomValueFromMultiples = (min: number, max: number, step: number) => {
  const multiples = Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step);
  return multiples[Math.floor(Math.random() * multiples.length)];
};

const randomPoints = () => getRandomValueFromMultiples(50, 1000, 25);
const randomMultipliers = () => parseFloat(getRandomValueFromMultiples(1.0, 10, 0.25).toFixed(2));

const Home: React.FC = () => {
  const [points, setPoints] = useState<number>(50); // Min and default value is 50, increment by 25
  const [multiplier, setMultiplier] = useState<number>(1.0); // Min and default value is 1.00, increment by 0.25
  const [speed, setSpeed] = useState<number>(1);
  const [speedMs, setSpeedMs] = useState<number>(5000);
  const [data, setData] = useState<GraphDataPoints[]>(defaultData);
  const [result, setResult] = useState<number>(0);
  const [chartKey, setChartKey] = useState<number>(0);
  const [round, setRound] = useState<Player[]>(roundDefault);
  const [ranking, setRanking] = useState<Player[]>(roundDefault);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userPoints, setUserPoints] = useState<number>(1000); // Example points

  useEffect(() => {
    if (isLoggedIn && !localStorage.getItem('demoMessagesSent')) {
      autoGenerateChat();
      localStorage.setItem('demoMessagesSent', 'true');
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const autoGenerateChat = () => {
    const demoMessages = [
      { user: 'CPU 1', text: 'hi guys' },
      { user: 'CPU 2', text: 'Hilliiiili men' },
      { user: 'CPU 1', text: 'I could play this game for hours!' }
    ];

    demoMessages.forEach((msg, index) => {
      setTimeout(() => {
        socket.emit('sendMessage', msg);
      }, index * 2000); // Delay each message by 2 seconds
    });
  };

  const startGame = useCallback(() => {
    console.log("startGame");
    setUserPoints(prevPoints => prevPoints - points);
    setData(defaultData);
    setResult(0);

    setTimeout(() => {
      const newData = generateData();      
      setData(newData); 
      const newResult = newData[10]?.multiplier ?? 0;
      setResult(newResult);
      console.log("newResult ===== "+newResult)

      

      setChartKey(prevKey => prevKey + 1); 
      const newRound = [
        { name: 'You', points, multiplier },
        ...['CPU 1', 'CPU 2', 'CPU 3', 'CPU 4'].map(cpu => ({
          name: cpu,
          points: randomPoints(),
          multiplier: randomMultipliers()
        }))
      ].map(player => ({
        ...player,
        points: player.points * player.multiplier
      }));

      setRound(newRound);
      
      setTimeout(() => {

        if(newResult > multiplier){
          console.log("------------ YOU have won")
          setUserPoints(prevPoints => prevPoints + (points * multiplier));
        }else{
          console.log("------------ YOU lost")
        }

        setRanking(prevRanking => {
          const updatedRanking = prevRanking.map(player => {
            const roundPlayer = newRound.find(p => p.name === player.name);
            return roundPlayer
              ? { ...player, points: player.points + roundPlayer.points }
              : player;
          });
          return updatedRanking.sort((a, b) => b.points - a.points);
        });
      }, speedMs);
    }, 1000);
  }, [result, points, multiplier, speedMs]);

  return (
    <div className="py-10 px-5">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-12 gap-6">
          {!isLoggedIn ? (
            <div className="col-span-4">
              <WelcomeLogin onLoginSuccess={handleLoginSuccess} />
            </div>
          ) : (
            <div className="col-span-4">
              <div className="styles.gameHeader">
                <div className="flex justify-center items-center columns-6 gap-3">
                  <NumberInput
                    label="Points"
                    value={points}
                    min={50}
                    step={25}
                    max={userPoints}
                    onChange={setPoints}
                  />
                  <NumberInput
                    label="Multiplier"
                    value={multiplier}
                    min={1.0}
                    step={0.25}
                    max={10}
                    onChange={setMultiplier}
                  />
                </div>
              </div>
              <button onClick={startGame} className="text-white font-bold py-2 px-4 rounded bg-gradient-to-r from-pink-500 to-red-500 w-full my-4">
                Start
              </button>
              <CurrentRound players={round} />
              <div>
                <SpeedSlider speed={speed} setSpeed={setSpeed} setSpeedMs={setSpeedMs} />
              </div>
            </div>
          )}
          <div className="col-span-8">
            <StatusBar loggedIn={isLoggedIn} userName={userName} points={userPoints} />
            <div className={styles.gameBoard}>
              <AnimatedNumber value={result} speedMs={speedMs} className={styles.animatedNumber} />
              <MultiplierGraph key={chartKey} data={data} speedMs={speedMs} />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6"><Ranking players={ranking} /></div>
          <div className="col-span-6"><Chat userName={userName} /></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
