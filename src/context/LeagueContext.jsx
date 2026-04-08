import React, { createContext, useContext, useState, useEffect } from 'react';

const LeagueContext = createContext();

export const useLeague = () => useContext(LeagueContext);

const initialPlayers = [
  { id: '1', username: 'Shubham Hande', password: 'password', name: 'Shubham Hande', goals: 0, leaguesWon: 0, flag: '🌍' },
  { id: '2', username: 'Gagan Kanni', password: 'password', name: 'Gagan Kanni', goals: 0, leaguesWon: 0, flag: '🌍' },
  { id: '3', username: 'Sudeep Hilli', password: 'password', name: 'Sudeep Hilli', goals: 0, leaguesWon: 0, flag: '🌍' },
  { id: '4', username: 'Prajwal Kasture', password: 'password', name: 'Prajwal Kasture', goals: 0, leaguesWon: 0, flag: '🌍' },
  { id: '5', username: 'Anil Hilli', password: 'password', name: 'Anil Hilli', goals: 0, leaguesWon: 0, flag: '🌍' },
].map(p => ({
  ...p,
  image: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=1e293b&color=fff&size=150`
}));

export const LeagueProvider = ({ children }) => {
  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('efootball_players');
    if (saved) return JSON.parse(saved);
    return initialPlayers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('efootball_currentUser');
    if (saved) return JSON.parse(saved);
    return null;
  });

  useEffect(() => {
    localStorage.setItem('efootball_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('efootball_currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('efootball_currentUser');
    }
  }, [currentUser]);

  const updatePlayerStats = (id, field, value) => {
    setPlayers(players.map(p => {
      if (p.id === id) {
        return { ...p, [field]: p[field] + value };
      }
      return p;
    }));
  };

  const setPlayerStats = (id, field, value) => {
    setPlayers(players.map(p => {
      if (p.id === id) {
        return { ...p, [field]: Number(value) };
      }
      return p;
    }));
  };

  const updatePlayerImage = (id, newImageUrl) => {
    setPlayers(players.map(p => {
      if (p.id === id) {
        return { ...p, image: newImageUrl };
      }
      return p;
    }));
  };

  const updatePlayerFlag = (id, flagEmoji) => {
    setPlayers(players.map(p => {
      if (p.id === id) {
        return { ...p, flag: flagEmoji };
      }
      return p;
    }));
  };

  const resetStats = (id) => {
    setPlayers(players.map(p => {
      if (p.id === id) {
        return { ...p, goals: 0, leaguesWon: 0 };
      }
      return p;
    }));
  };

  const resetAllStats = () => {
    setPlayers(players.map(p => ({ ...p, goals: 0, leaguesWon: 0 })));
  };

  const hardResetApp = () => {
    localStorage.removeItem('efootball_players');
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
      hardResetApp
    }}>
      {children}
    </LeagueContext.Provider>
  );
};
