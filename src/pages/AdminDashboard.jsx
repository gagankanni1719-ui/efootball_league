import React, { useState, useEffect } from 'react';
import { useLeague } from '../context/LeagueContext';
import { RefreshCw, Plus, Minus, Save, Table, Trophy } from 'lucide-react';

const AdminDashboard = () => {
  const { 
    players, 
    resetStats, 
    resetAllStats, 
    resetLeagueForm, 
    resetAllLeagueForm, 
    hardResetApp, 
    saveMultiplePlayers 
  } = useLeague();
  
  const [draftPlayers, setDraftPlayers] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Deep clone players to draft whenever context updates 
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
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-oswald text-4xl">Admin Dashboard</h1>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={hardResetApp}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500 hover:text-white rounded-lg transition-colors text-sm"
            title="Clears local cache and reloads default players"
          >
            <RefreshCw className="w-4 h-4" /> Hard Reset App Cache
          </button>

          <button 
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isSaving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>

      {/* SECTION 1: ONGOING LEAGUE FORM */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-oswald text-2xl flex items-center gap-2 text-indigo-400">
            <Table className="w-6 h-6" /> ONGOING LEAGUE MATCHES
          </h2>
          <button 
            onClick={resetAllLeagueForm}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-sm border border-red-500/20"
            title="Wipes W-D-L to 0 for all players (Starts a new league season!)"
          >
            <RefreshCw className="w-4 h-4" /> Start New League (Reset Form)
          </button>
        </div>
        
        <div className="glassmorphism rounded-2xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400">Player</th>
                  <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center" title="Wins">Matches Won</th>
                  <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center" title="Draws">Matches Drawn</th>
                  <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center" title="Losses">Matches Lost</th>
                  <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-right">Reset Form</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {draftPlayers.map(player => (
                  <tr key={player.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4 w-1/4">
                      <div className="flex items-center gap-3">
                        <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                        <p className="font-bold">{player.name}</p>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <input 
                          type="number"
                          value={player.matchesWon || 0}
                          onChange={(e) => handleInputChange(player.id, 'matchesWon', e.target.value)}
                          className="w-16 bg-slate-900/50 border border-white/10 rounded-lg px-2 py-1 text-xl font-oswald font-bold text-center text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                          min="0"
                        />
                        <div className="flex gap-1">
                          <button onClick={() => handleAdjust(player.id, 'matchesWon', 1)} className="p-1.5 rounded bg-white/5 hover:bg-emerald-500/20 text-emerald-400"><Plus size={14} /></button>
                          <button onClick={() => handleAdjust(player.id, 'matchesWon', -1)} className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-red-400"><Minus size={14} /></button>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <input 
                          type="number"
                          value={player.matchesDrawn || 0}
                          onChange={(e) => handleInputChange(player.id, 'matchesDrawn', e.target.value)}
                          className="w-16 bg-slate-900/50 border border-white/10 rounded-lg px-2 py-1 text-xl font-oswald font-bold text-center text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all"
                          min="0"
                        />
                        <div className="flex gap-1">
                          <button onClick={() => handleAdjust(player.id, 'matchesDrawn', 1)} className="p-1.5 rounded bg-white/5 hover:bg-slate-500/20 text-slate-300"><Plus size={14} /></button>
                          <button onClick={() => handleAdjust(player.id, 'matchesDrawn', -1)} className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-red-400"><Minus size={14} /></button>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <input 
                          type="number"
                          value={player.matchesLost || 0}
                          onChange={(e) => handleInputChange(player.id, 'matchesLost', e.target.value)}
                          className="w-16 bg-slate-900/50 border border-white/10 rounded-lg px-2 py-1 text-xl font-oswald font-bold text-center text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                          min="0"
                        />
                        <div className="flex gap-1">
                          <button onClick={() => handleAdjust(player.id, 'matchesLost', 1)} className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-red-400"><Plus size={14} /></button>
                          <button onClick={() => handleAdjust(player.id, 'matchesLost', -1)} className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-red-400"><Minus size={14} /></button>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button 
                        onClick={() => resetLeagueForm(player.id)}
                        className="inline-flex flex-col items-center justify-center p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                        title="Reset W-D-L to 0 for this player"
                      >
                        <RefreshCw className="w-5 h-5 mb-1" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Reset</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 2: ALL TIME STATS */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-oswald text-2xl flex items-center gap-2 text-yellow-500">
            <Trophy className="w-6 h-6" /> ALL TIME STATS
          </h2>
          <button 
            onClick={resetAllStats}
            className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-red-500 transition-colors text-xs uppercase tracking-widest font-bold"
            title="DANGER: Wipes EVERYTHING to 0 (Goals, Leagues, Form) for everybody"
          >
            <RefreshCw className="w-3 h-3" /> Hard Reset All
          </button>
        </div>
        
        <div className="glassmorphism rounded-2xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400">Player</th>
                  <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center">Total Goals Scored</th>
                  <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-center">Total Leagues Won</th>
                  <th className="px-4 py-4 font-oswald tracking-wider uppercase text-slate-400 text-right">Reset All-Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {draftPlayers.map(player => (
                  <tr key={player.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-4 w-1/4">
                      <div className="flex items-center gap-3">
                        <img src={player.image} alt={player.name} className="w-8 h-8 rounded-full object-cover border border-white/20 opacity-80" />
                        <p className="font-bold text-slate-300">{player.name}</p>
                      </div>
                    </td>
                    
                    <td className="px-4 py-4 text-center">
                      <input 
                        type="number"
                        value={player.goals || 0}
                        onChange={(e) => handleInputChange(player.id, 'goals', e.target.value)}
                        className="w-20 bg-slate-900/50 border border-white/10 rounded-lg px-2 py-1 text-2xl font-oswald font-bold text-center text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all mx-auto"
                        min="0"
                      />
                    </td>
                    
                    <td className="px-4 py-4 text-center">
                      <input 
                        type="number"
                        value={player.leaguesWon || 0}
                        onChange={(e) => handleInputChange(player.id, 'leaguesWon', e.target.value)}
                        className="w-20 bg-slate-900/50 border border-white/10 rounded-lg px-2 py-1 text-2xl font-oswald font-bold text-center text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all mx-auto"
                        min="0"
                      />
                    </td>
                    
                    <td className="px-4 py-4 text-right">
                      <button 
                        onClick={() => resetStats(player.id)}
                        className="inline-flex flex-col items-center justify-center p-2 text-slate-600 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors"
                        title="Danger: Reset Goals and Leagues Won to 0 for this player"
                      >
                        <RefreshCw className="w-4 h-4 mb-1" />
                        <span className="text-[9px] uppercase font-bold tracking-widest leading-none">Reset<br/>Stats</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;

