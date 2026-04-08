import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { clsx } from 'clsx';

const Leaderboard = ({ players }) => {
  // Sort by goals descending
  const sortedPlayers = [...players].sort((a, b) => b.goals - a.goals);

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1: return <Medal className="w-5 h-5 text-slate-300" />;
      case 2: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center font-bold text-slate-500">{index + 1}</span>;
    }
  };

  return (
    <div className="glassmorphism rounded-2xl p-6">
      <h2 className="font-oswald text-2xl uppercase tracking-wider mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-indigo-400" />
        Golden Boot Race
      </h2>
      
      <div className="space-y-3">
        {sortedPlayers.map((player, index) => (
          <div 
            key={player.id}
            className={clsx(
              "flex items-center justify-between p-4 rounded-xl border transition-colors",
              index === 0 ? "bg-indigo-500/10 border-indigo-500/30" : "bg-white/5 border-white/5 hover:bg-white/10"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-8 flex justify-center">
                {getRankIcon(index)}
              </div>
              <div>
                <p className="font-bold text-lg">{player.name}</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">{player.leaguesWon} Leagues Won</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-950/50 px-4 py-2 rounded-lg">
              <span className="font-oswald text-2xl font-bold text-emerald-400">{player.goals}</span>
              <span className="text-xs text-slate-400 uppercase">Goals</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
