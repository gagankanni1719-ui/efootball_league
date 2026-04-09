import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const LeagueContext = createContext();

export const useLeague = () => useContext(LeagueContext);

const initialPlayers = [
  { id: '1', username: 'Shubham Hande', password: 'password', name: 'Shubham Hande', goals: 0, leaguesWon: 0, matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0, flag: '🌍' },
  { id: '2', username: 'Gagan Kanni', password: 'password', name: 'Gagan Kanni', goals: 0, leaguesWon: 0, matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0, flag: '🌍' },
  { id: '3', username: 'Sudeep Hilli', password: 'password', name: 'Sudeep Hilli', goals: 0, leaguesWon: 0, matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0, flag: '🌍' },
  { id: '4', username: 'Prajwal Kasture', password: 'password', name: 'Prajwal Kasture', goals: 0, leaguesWon: 0, matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0, flag: '🌍' },
  { id: '5', username: 'Anil Hilli', password: 'password', name: 'Anil Hilli', goals: 0, leaguesWon: 0, matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0, flag: '🌍' },
].map(p => ({
  ...p,
  image: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=1e293b&color=fff&size=150`
}));

export const LeagueProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Still keep currentUser in localStorage since auth is hardcoded per browser
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('efootball_currentUser');
    if (saved) return JSON.parse(saved);
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('efootball_currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('efootball_currentUser');
    }
  }, [currentUser]);

  // Fetch from Supabase
  const fetchPlayers = async () => {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('id', { ascending: true });
      
    if (error) {
      console.error("Error fetching players:", error);
    } else if (data && data.length > 0) {
      setPlayers(data);
    } else {
      // If table is empty or missing, fallback to initial temporary state
      setPlayers(initialPlayers);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlayers();

    // Subscribe to realtime updates
    const subscription = supabase
      .channel('players_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, payload => {
        // Sync local state when remote changes
        fetchPlayers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const updatePlayerStats = async (id, field, value) => {
    const player = players.find(p => p.id === id);
    if (!player) return;
    
    const newValue = player[field] + value;
    // Optimistic update
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: newValue } : p));
    
    // Sync with Supabase
    await supabase.from('players').update({ [field]: newValue }).eq('id', id);
  };

  const setPlayerStats = async (id, field, value) => {
    const numValue = Number(value);
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: numValue } : p));
    await supabase.from('players').update({ [field]: numValue }).eq('id', id);
  };

  const updatePlayerImage = async (id, newImageUrl) => {
    setPlayers(players.map(p => p.id === id ? { ...p, image: newImageUrl } : p));
    await supabase.from('players').update({ image: newImageUrl }).eq('id', id);
  };

  const updatePlayerFlag = async (id, flagEmoji) => {
    setPlayers(players.map(p => p.id === id ? { ...p, flag: flagEmoji } : p));
    await supabase.from('players').update({ flag: flagEmoji }).eq('id', id);
  };

  const resetStats = async (id) => {
    setPlayers(players.map(p => p.id === id ? { ...p, goals: 0, leaguesWon: 0, matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0 } : p));
    await supabase.from('players').update({ goals: 0, leaguesWon: 0, matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0 }).eq('id', id);
  };

  const resetAllStats = async () => {
    setPlayers(players.map(p => ({ ...p, goals: 0, leaguesWon: 0, matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0 })));
    for (const p of players) {
      await supabase.from('players').update({ goals: 0, leaguesWon: 0, matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0 }).eq('id', p.id);
    }
  };

  const resetLeagueForm = async (id) => {
    setPlayers(players.map(p => p.id === id ? { ...p, matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0 } : p));
    await supabase.from('players').update({ matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0 }).eq('id', id);
  };

  const resetAllLeagueForm = async () => {
    setPlayers(players.map(p => ({ ...p, matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0 })));
    for (const p of players) {
      await supabase.from('players').update({ matchesWon: 0, matchesLost: 0, matchesDrawn: 0, winStreak: 0, goalsAgainst: 0 }).eq('id', p.id);
    }
  };

  const saveMultiplePlayers = async (updatedPlayers) => {
    setPlayers(updatedPlayers);
    let hasError = false;
    let errorMessage = '';

    for (const p of updatedPlayers) {
      const { error } = await supabase.from('players').update({
        goals: p.goals,
        leaguesWon: p.leaguesWon,
        matchesWon: p.matchesWon,
        matchesLost: p.matchesLost,
        matchesDrawn: p.matchesDrawn,
        winStreak: p.winStreak,
        goalsAgainst: p.goalsAgainst
      }).eq('id', p.id);
      
      if (error) {
        hasError = true;
        errorMessage = error.message;
        console.error("Supabase Save Error for player", p.id, error);
      }
    }

    if (hasError) {
      alert("Failed to save changes to the database! Did you run the SQL command in Supabase to add the new columns?\n\nError details: " + errorMessage);
    }
  };

  const hardResetApp = () => {
    // We only clear the current user login session now
    localStorage.clear();
    window.location.reload();
  };

  return (
    <LeagueContext.Provider value={{
      players,
      currentUser,
      setCurrentUser,
      updatePlayerStats,
      setPlayerStats,
      updatePlayerImage,
      updatePlayerFlag,
      resetStats,
      resetAllStats,
      resetLeagueForm,
      resetAllLeagueForm,
      saveMultiplePlayers,
      hardResetApp,
      loading
    }}>
      {!loading ? children : (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      )}
    </LeagueContext.Provider>
  );
};
