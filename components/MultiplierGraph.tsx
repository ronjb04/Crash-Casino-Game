import { FC } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MultiplierGraphProps {
  data: { name: string; multiplier?: number }[];
  speedMs: number;
}

const MultiplierGraph: FC<MultiplierGraphProps> = ({ data, speedMs }) => {
  const CustomDot = (props: { cx: any; cy: any; index: any; }) => {
    const { cx, cy, index } = props;
    const isLast = index === data.length - 1;
    if (isLast && data[index].multiplier != undefined) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          stroke="none"
          fill="yellow"
        />
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={420} className="bg-gray-800 mt-6 rounded-lg pt-4 pb-6">
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <Line 
          type="monotone" 
          dataKey="multiplier" 
          stroke="#8884d8" 
          isAnimationActive={true}
          animationDuration={speedMs} 
          animationBegin={0}
          dot={<CustomDot cx={undefined} cy={undefined} index={undefined} />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MultiplierGraph;
