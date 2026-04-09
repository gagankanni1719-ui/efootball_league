import React from 'react';
import { Trophy, Medal, Award, Table } from 'lucide-react';
import { clsx } from 'clsx';

const Leaderboard = ({ players }) => {
  // Sort for Golden Boot
  const sortedByGoals = [...players].sort((a, b) => b.goals - a.goals);

  // Calculate points and sort for League Standings
  const playersWithPoints = players.map(p => ({
    ...p,
    points: (p.matchesWon || 0) * 3 + (p.matchesDrawn || 0) * 1,
    played: (p.matchesWon || 0) + (p.matchesDrawn || 0) + (p.matchesLost || 0)
  }));

  const sortedByPoints = [...playersWithPoints].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goals !== a.goals) return b.goals - a.goals; // Goal difference fallback (sort of)
    return b.leaguesWon - a.leaguesWon;
  });

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1: return <Medal className="w-5 h-5 text-slate-300" />;
      case 2: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center font-bold text-slate-500">{index + 1}</span>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* League Standings Section */}
      <div className="glassmorphism rounded-2xl p-6 lg:col-span-2">
        <h2 className="font-oswald text-2xl uppercase tracking-wider mb-6 flex items-center gap-2">
          <Table className="w-6 h-6 text-indigo-400" />
          League Standings
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="border-b border-white/10 text-slate-400 font-oswald tracking-wider uppercase text-sm">
              <tr>
                <th className="pb-3 px-2 text-center w-12">Pos</th>
                <th className="pb-3 px-2">Club / Player</th>
                <th className="pb-3 px-2 text-center" title="Played">P</th>
                <th className="pb-3 px-2 text-center" title="Won">W</th>
                <th className="pb-3 px-2 text-center" title="Drawn">D</th>
                <th className="pb-3 px-2 text-center" title="Lost">L</th>
                <th className="pb-3 px-2 text-center" title="Goals Scored">G</th>
                <th className="pb-3 px-2 text-center font-bold text-white tracking-widest" title="Points">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedByPoints.map((player, index) => (
                <tr 
                  key={player.id} 
                  className={clsx(
                    "hover:bg-white/5 transition-colors",
                    index === 0 && "bg-indigo-500/10"
                  )}
                >
                  <td className="py-4 px-2 text-center font-oswald text-xl text-slate-400">{index + 1}</td>
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <img src={player.image} alt={player.name} className="w-8 h-8 rounded-full border border-white/20" />
                      <div>
                        <p className="font-bold">{player.name}</p>
                        <p className="text-xs text-slate-400">{player.flag} {player.leaguesWon} Leagues</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center text-slate-300 font-oswald text-lg">{player.played}</td>
                  <td className="py-4 px-2 text-center text-emerald-400 font-oswald text-lg">{player.matchesWon || 0}</td>
                  <td className="py-4 px-2 text-center text-slate-300 font-oswald text-lg">{player.matchesDrawn || 0}</td>
                  <td className="py-4 px-2 text-center text-red-400 font-oswald text-lg">{player.matchesLost || 0}</td>
                  <td className="py-4 px-2 text-center text-blue-400 font-oswald text-lg">{player.goals || 0}</td>
                  <td className="py-4 px-2 text-center text-2xl font-oswald font-bold text-indigo-400">{player.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Golden Boot Section */}
      <div className="glassmorphism rounded-2xl p-6 lg:col-span-2">
        <h2 className="font-oswald text-2xl uppercase tracking-wider mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          Golden Boot Race
        </h2>
        
        <div className="space-y-3">
          {sortedByGoals.map((player, index) => (
            <div 
              key={player.id}
              className={clsx(
                "relative flex items-center justify-between p-4 rounded-xl border transition-colors overflow-hidden group",
                index === 0 && player.goals < 10 ? "bg-yellow-500/10 border-yellow-500/30" : "bg-white/5 border-white/5 hover:bg-white/10",
                player.goals >= 10 && "border-white/20 shadow-[0_0_15px_rgba(34,197,94,0.2)] ring-1 ring-white/30"
              )}
            >
              {player.goals >= 10 && (
                <>
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay z-0 transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: "url('/epic-10-goals.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
                </>
              )}
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-8 flex justify-center">
                  {getRankIcon(index)}
                </div>
                <div>
                  <p className="font-bold text-lg">{player.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-slate-950/50 px-4 py-2 rounded-lg relative z-10 glassmorphism border border-white/10">
                <span className="font-oswald text-2xl font-bold text-emerald-400">{player.goals}</span>
                <span className="text-xs text-slate-400 uppercase">Goals</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Leaderboard;
