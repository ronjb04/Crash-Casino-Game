import { FC, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface AnimatedNumberProps {
  value: number;
  speedMs: number;
  className?: string; // Allow an optional className prop
}

const AnimatedNumber: FC<AnimatedNumberProps> = ({ value, speedMs, className }) => {

  const [flip, set] = useState(false);

  const { number } = useSpring({
    from: { number: 0.00 },
    number: value,
    delay: 200,
    config: { duration: speedMs},
    immediate: value === 0, // Skip animation if value is 0
  });

  return (
    <div className={className}>
      {className.includes("Root_animatedNumber") ? 
        <div className='flex'>
        <animated.div>
          {value === 0 ? "0.00" : number.to((n) => n.toFixed(2))}
        </animated.div>x </div>
        : 
        <div><animated.div>
          {value === 0 ? "0.00" : number.to((n) => n.toFixed(0))}
        </animated.div>
        </div>
      }
    </div>
  );
};

export default AnimatedNumber;