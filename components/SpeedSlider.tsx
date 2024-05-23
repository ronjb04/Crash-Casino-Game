import { FC } from 'react';

interface SpeedSliderProps {
  speed: number;
  setSpeed: (speed: number) => void;
  setSpeedMs: (speed: number) => void;
}

const SpeedSlider: FC<SpeedSliderProps> = ({ speed, setSpeed, setSpeedMs }) => {
  return (
    <div className='w-full'>
      {/* <div>Speed: {speed}x</div> */}
      <div className="flex items-center mt-6 mb-2">
        <svg className="mr-2 w-[24px] h-[24px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"/>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        </svg>
        <h2 className='font-bold text-xl'>Speed</h2>
      </div>
      <div className="relative pt-2 pb-8 px-3 shadow-md sm:rounded-lg border-slate-700 border">
        <input type="range" 
          min="1" 
          max="5" 
          value={speed} 
          onChange={(e) => {
            setSpeed(Number(e.target.value))
            setSpeedMs((6 - (Number(e.target.value))) * 1000)
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
        />
        <div className='relative'>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-5">1x</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-5">2x</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-5">3x</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-3/4 -translate-x-1/2 rtl:translate-x-1/2 -bottom-5">4x</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-5">5x</span>
        </div>
      </div>
      
    </div>
  );
};

export default SpeedSlider;
