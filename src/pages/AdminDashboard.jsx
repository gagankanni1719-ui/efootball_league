import React, { useState, useEffect } from 'react';
import { useLeague } from '../context/LeagueContext';
import { RefreshCw, Plus, Minus, Save } from 'lucide-react';

const AdminDashboard = () => {
  const { players, resetStats, resetAllStats, hardResetApp, saveMultiplePlayers } = useLeague();
  
  const [draftPlayers, setDraftPlayers] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Deep clone players to draft whenever context updates 
    // (which will happen on initial load, or after a save)
    setDraftPlayers(JSON.parse(JSON.stringify(players)));
  }, [players]);

  const handleAdjust = (id, field, amount) => {
    setDraftPlayers(currentDrafts => 
      currentDrafts.map(p => p.id === id ? { ...p, [field]: (p[field] || 0) + amount } : p)
    );
  };
  
  const handleInputChange = (id, field, value) => {
    const numValue = Number(value);
    setDraftPlayers(currentDrafts => 
      currentDrafts.map(p => p.id === id ? { ...p, [field]: numValue } : p)
    );
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    await saveMultiplePlayers(draftPlayers);
    setIsSaving(false);
    // Button could show some success feedback here, but simple is fine.
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="font-oswald text-3xl">Control Panel</h1>
        
        <div className="flex flex-wrap gap-2">
          {/* New Save All Button */}
          <button 
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save All Changes"}
          </button>

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
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400">Player</th>
                <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center">Goals</th>
                <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center">Leagues</th>
                <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center" title="Wins">W</th>
                <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center" title="Draws">D</th>
                <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center" title="Losses">L</th>
                <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {draftPlayers.map(player => (
                <tr key={player.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                      <div>
                        <p className="font-bold">{player.name}</p>
                        <p className="text-xs text-slate-400">@{player.username}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 text-center">
                    <input 
                      type="number"
                      value={player.goals || 0}
                      onChange={(e) => handleInputChange(player.id, 'goals', e.target.value)}
                      className="w-16 bg-slate-900/50 border border-white/10 rounded-lg px-2 py-1 text-xl font-oswald font-bold text-center text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all mx-auto"
                      min="0"
                    />
                  </td>
                  
                  <td className="px-4 py-4 text-center">
                    <input 
                      type="number"
                      value={player.leaguesWon || 0}
                      onChange={(e) => handleInputChange(player.id, 'leaguesWon', e.target.value)}
                      className="w-16 bg-slate-900/50 border border-white/10 rounded-lg px-2 py-1 text-xl font-oswald font-bold text-center text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all mx-auto"
                      min="0"
                    />
                  </td>

                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <input 
                        type="number"
                        value={player.matchesWon || 0}
                        onChange={(e) => handleInputChange(player.id, 'matchesWon', e.target.value)}
                        className="w-14 bg-slate-900/50 border border-white/10 rounded-lg px-1 py-1 text-lg font-oswald font-bold text-center text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        min="0"
                      />
                      <div className="flex gap-1">
                        <button onClick={() => handleAdjust(player.id, 'matchesWon', 1)} className="p-1 rounded bg-white/5 hover:bg-emerald-500/20 text-emerald-400"><Plus size={12} /></button>
                        <button onClick={() => handleAdjust(player.id, 'matchesWon', -1)} className="p-1 rounded bg-white/5 hover:bg-red-500/20 text-red-400"><Minus size={12} /></button>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <input 
                        type="number"
                        value={player.matchesDrawn || 0}
                        onChange={(e) => handleInputChange(player.id, 'matchesDrawn', e.target.value)}
                        className="w-14 bg-slate-900/50 border border-white/10 rounded-lg px-1 py-1 text-lg font-oswald font-bold text-center text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all"
                        min="0"
                      />
                      <div className="flex gap-1">
                        <button onClick={() => handleAdjust(player.id, 'matchesDrawn', 1)} className="p-1 rounded bg-white/5 hover:bg-slate-500/20 text-slate-300"><Plus size={12} /></button>
                        <button onClick={() => handleAdjust(player.id, 'matchesDrawn', -1)} className="p-1 rounded bg-white/5 hover:bg-red-500/20 text-red-400"><Minus size={12} /></button>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <input 
                        type="number"
                        value={player.matchesLost || 0}
                        onChange={(e) => handleInputChange(player.id, 'matchesLost', e.target.value)}
                        className="w-14 bg-slate-900/50 border border-white/10 rounded-lg px-1 py-1 text-lg font-oswald font-bold text-center text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        min="0"
                      />
                      <div className="flex gap-1">
                        <button onClick={() => handleAdjust(player.id, 'matchesLost', 1)} className="p-1 rounded bg-white/5 hover:bg-red-500/20 text-red-400"><Plus size={12} /></button>
                        <button onClick={() => handleAdjust(player.id, 'matchesLost', -1)} className="p-1 rounded bg-white/5 hover:bg-red-500/20 text-red-400"><Minus size={12} /></button>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                        <button 
                        onClick={() => resetStats(player.id)}
                        className="flex items-center justify-center w-8 h-8 bg-slate-800 text-slate-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors ml-2"
                        title="Reset Player Stats via DB"
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
