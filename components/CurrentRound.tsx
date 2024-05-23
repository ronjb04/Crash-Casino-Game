import { FC } from 'react';
import React from 'react';
import classNames from 'classnames';
import AnimatedNumber from './AnimatedNumber';

interface Player {
  name: string;
  points: number;
  multiplier: number;
}

interface CurrentRoundProps {
  players: Player[];
}

const CurrentRound: FC<CurrentRoundProps> = ({ players }) => {
  return (
    <div>
       <div className="flex items-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mr-2 w-[20px] h-[20px] text-gray-800 dark:text-white">
          <path fillRule="evenodd" d="M12 1.69a.494.494 0 0 0-.438-.494 32.352 32.352 0 0 0-7.124 0A.494.494 0 0 0 4 1.689v.567c-.811.104-1.612.24-2.403.406a.75.75 0 0 0-.595.714 4.5 4.5 0 0 0 4.35 4.622A3.99 3.99 0 0 0 7 8.874V10H6a1 1 0 0 0-1 1v2h-.667C3.597 13 3 13.597 3 14.333c0 .368.298.667.667.667h8.666a.667.667 0 0 0 .667-.667c0-.736-.597-1.333-1.333-1.333H11v-2a1 1 0 0 0-1-1H9V8.874a3.99 3.99 0 0 0 1.649-.876 4.5 4.5 0 0 0 4.35-4.622.75.75 0 0 0-.596-.714A30.897 30.897 0 0 0 12 2.256v-.567ZM4 3.768c-.49.066-.976.145-1.458.235a3.004 3.004 0 0 0 1.64 2.192A3.999 3.999 0 0 1 4 5V3.769Zm8 0c.49.066.976.145 1.458.235a3.004 3.004 0 0 1-1.64 2.192C11.936 5.818 12 5.416 12 5V3.769Z" clipRule="evenodd" />
        </svg>
        <h2 className='font-bold text-xl'>Current Round</h2>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-slate-700 border">
      
        <table className="w-full font-bold text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className='text-xs text-gray-300 bg-gradient-to-r from-gray-900 to-slate-800'>
            <tr>
              <th className='px-6 py-1'>Name</th>
              <th className='px-6 py-1'>Points</th>
              <th className='px-6 py-1'>Multiplier</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <React.Fragment key={index}>
                <tr className={classNames(
                'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700',
                {
                  'text-green-600': player.points > 0,  
                  'text-gray-300': player.points == 0,
                  'odd:dark:bg-gray-600 even:dark:bg-gray-600': index == 0,
                }
              )}>
                  <td className='px-6 py-2'>{player.name}</td>
                  <td className='px-6 py-2'>{(player.points).toFixed(0)}</td>
                  <td className='px-6 py-2'>{player.multiplier}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentRound;
