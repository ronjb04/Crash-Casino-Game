import { FC } from 'react';
import React from 'react';
import classNames from 'classnames';
import AnimatedNumber from './AnimatedNumber';

interface Player {
  name: string;
  points: number;
}

interface RankingProps {
  players: Player[];
}

const Ranking: FC<RankingProps> = ({ players }) => {
  return (
    <div className="mt-6">
      <div className="flex items-center mb-2">
        <svg className="mr-2 w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"/>
        </svg>
        <h2 className="font-bold text-xl">Ranking</h2>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-slate-700 border">
        <table className="w-full font-bold text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-300 bg-gradient-to-r from-gray-900 to-slate-800">
            <tr>
              <th className="px-6 py-1">No.</th>
              <th className="px-6 py-1">Name</th>
              <th className="px-6 py-1">Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <React.Fragment key={index}>
                <tr className={classNames(
                  'odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700',
                  {
                    'odd:dark:bg-gray-700 even:dark:bg-gray-700': player.name === "You"
                  }
                )}>
                  <td className="px-6 py-2">{index + 1}</td>
                  <td className="px-6 py-2">{player.name}</td>
                  <td className="px-6 py-2"><AnimatedNumber value={player.points} speedMs={1000} className="flex" /></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
