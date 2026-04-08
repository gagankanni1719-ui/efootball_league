import React from 'react';
import { useLeague } from '../context/LeagueContext';
import { RefreshCw, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const { players, updatePlayerStats, setPlayerStats, resetStats, resetAllStats, hardResetApp } = useLeague();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="font-oswald text-3xl">Control Panel</h1>
        
        <div className="flex gap-2">
          <button 
            onClick={resetAllStats}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset All Stats
          </button>
          
          <button 
            onClick={hardResetApp}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-white rounded-lg transition-colors"
            title="Clears the local storage cache and reloads the new default players"
          >
            <RefreshCw className="w-4 h-4" />
            Hard Reset Cache
          </button>
        </div>
      </div>

      <div className="glassmorphism rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-oswald tracking-wider uppercase text-slate-400">Player</th>
                <th className="px-6 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center">Goals</th>
                <th className="px-6 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center">Leagues</th>
                <th className="px-6 py-4 font-oswald tracking-wider uppercase text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {players.map(player => (
                <tr key={player.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                      <div>
                        <p className="font-bold">{player.name}</p>
                        <p className="text-xs text-slate-400">@{player.username}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    <input 
                      type="number"
                      value={player.goals}
                      onChange={(e) => setPlayerStats(player.id, 'goals', e.target.value)}
                      className="w-20 bg-slate-900/50 border border-white/10 rounded-lg px-3 py-2 text-2xl font-oswald font-bold text-center text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all mx-auto"
                      min="0"
                    />
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    <input 
                      type="number"
                      value={player.leaguesWon}
                      onChange={(e) => setPlayerStats(player.id, 'leaguesWon', e.target.value)}
                      className="w-20 bg-slate-900/50 border border-white/10 rounded-lg px-3 py-2 text-2xl font-oswald font-bold text-center text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all mx-auto"
                      min="0"
                    />
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => updatePlayerStats(player.id, 'goals', 1)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-lg transition-colors text-sm font-bold"
                      >
                        <Plus className="w-3 h-3" /> Goal
                      </button>
                      
                      <button 
                        onClick={() => updatePlayerStats(player.id, 'leaguesWon', 1)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors text-sm font-bold"
                      >
                        <Plus className="w-3 h-3" /> League
                      </button>

                      <button 
                        onClick={() => resetStats(player.id)}
                        className="flex items-center justify-center w-8 h-8 bg-slate-800 text-slate-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors ml-2"
                        title="Reset Player Stats"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
