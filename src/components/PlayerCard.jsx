import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Trophy, Goal, Camera, Check, X, Star } from 'lucide-react';
import { useLeague } from '../context/LeagueContext';

const PlayerCard = ({ player, isCurrentUser, isTopScorer, isLeagueLeader }) => {
  const { updatePlayerImage, updatePlayerFlag } = useLeague();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [newPfpUrl, setNewPfpUrl] = useState(player.image);
  const [newFlag, setNewFlag] = useState(player.flag || '🌍');

  const isEpic = player.goals >= 10;
  
  const played = (player.matchesWon || 0) + (player.matchesDrawn || 0) + (player.matchesLost || 0);
  const isOnFire = (player.winStreak || 0) >= 3;
  const isBrickWall = played >= 3 && (player.goalsAgainst || 0) === 0;
  const isGiantSlayer = player.giantSlayer === true;

  const handleSaveProfile = () => {
    if (newPfpUrl.trim() !== '') {
      updatePlayerImage(player.id, newPfpUrl);
    }
    if (newFlag.trim() !== '') {
      updatePlayerFlag(player.id, newFlag);
    }
    setIsEditingProfile(false);
  };

  return (
    <div className={clsx(
      "relative group rounded-2xl overflow-hidden transition-all duration-500",
      "hover:scale-[1.03] hover:-translate-y-2",
      isEpic 
        ? "hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] shadow-[0_0_15px_rgba(34,197,94,0.2)] ring-2 ring-green-400/80 ring-offset-4 ring-offset-slate-950" 
        : "hover:shadow-2xl hover:shadow-indigo-500/20",
      !isEpic && isCurrentUser ? "ring-2 ring-indigo-500 ring-offset-4 ring-offset-slate-950 scale-[1.02]" : "",
      !isEpic && !isCurrentUser ? "border border-white/10" : ""
    )}>
      {/* Background Gradient / Image */}
      <div 
        className={clsx(
          "absolute inset-0 opacity-100 transition-opacity group-hover:opacity-100",
          isEpic && "bg-cover bg-center brightness-[0.8] contrast-[1.2]",
          !isEpic && isTopScorer && "bg-gradient-to-br from-orange-600 via-red-900 to-slate-900",
          !isEpic && !isTopScorer && isLeagueLeader && "bg-gradient-to-br from-yellow-500 via-yellow-800 to-slate-900",
          !isEpic && !isTopScorer && !isLeagueLeader && "bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-950"
        )}
        style={isEpic ? { backgroundImage: "url('/epic-10-goals.jpg')" } : {}}
      />

      {/* Glossy Overlay & Epic FX */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none" />
      {isEpic && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400/30 to-transparent mix-blend-overlay animate-pulse pointer-events-none" />
      )}

      {/* Content */}
      <div 
        className={clsx(
          "relative p-6 flex flex-col items-center h-full z-10 bg-transparent border-none",
          !isEpic && "glassmorphism",
          isEpic && "bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl"
        )}
      >
        
        {/* Badges */}
        <div className="absolute top-4 w-full px-4 flex justify-between z-30 pointer-events-none">
          <div className="flex flex-col gap-1">
            {isEpic && (
              <span className="inline-flex w-fit items-center gap-1 text-[10px] font-bold px-2 py-1 bg-gradient-to-r from-green-100 via-green-400 to-green-600 text-green-950 rounded-md shadow-[0_0_15px_rgba(34,197,94,0.6)] border border-green-300">
                ✨ EPIC
              </span>
            )}
            {isTopScorer && (
              <span className="inline-flex w-fit items-center gap-1 text-xs font-bold px-2 py-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-md shadow-lg shadow-red-900/50">
                🔥 TOP SCORER
              </span>
            )}
            {isLeagueLeader && !isTopScorer && (
              <span className="inline-flex w-fit items-center gap-1 text-xs font-bold px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-950 rounded-md shadow-lg shadow-yellow-900/50">
                👑 LEADER
              </span>
            )}
          </div>
          
          {isCurrentUser && (
            <span className="h-fit ml-auto text-xs font-bold px-2 py-1 bg-indigo-500 rounded-md shadow-lg shadow-indigo-900/50">
              YOU
            </span>
          )}
        </div>

        {/* Player Image & Name */}
        <div className="mt-8 mb-4 relative group/pfp">
          <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full" />
          <img 
            src={player.image} 
            alt={player.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white/10 shadow-xl relative z-10"
          />
          
          {isCurrentUser && !isEditingProfile && (
            <button 
              onClick={() => {
                setNewPfpUrl('');
                setNewFlag('');
                setIsEditingProfile(true);
              }}
              className="absolute bottom-0 right-0 z-20 bg-indigo-500 hover:bg-indigo-400 p-2 rounded-full shadow-lg opacity-0 group-hover/pfp:opacity-100 transition-opacity"
              title="Edit Profile (Picture & Flag)"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
        
        {/* Profile Edit Input */}
        {isEditingProfile && isCurrentUser && (
          <div className="w-full relative z-20 mb-4 bg-slate-900/80 p-2 rounded-lg border border-white/10 flex flex-col gap-2">
            <input 
              type="text" 
              value={newPfpUrl}
              onChange={(e) => setNewPfpUrl(e.target.value)}
              placeholder="Paste Image URL..."
              className="w-full bg-slate-950 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-indigo-500"
              title="Profile Picture URL"
            />
            <input 
              type="text" 
              value={newFlag}
              onChange={(e) => setNewFlag(e.target.value)}
              placeholder="Paste Emoji Flag 🌍"
              className="w-full bg-slate-950 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-indigo-500"
              maxLength={4}
              title="Country Flag (Emoji Only)"
            />
            <div className="flex justify-end gap-1">
              <button 
                onClick={() => setIsEditingProfile(false)} 
                className="p-1 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded"
              >
                <X className="w-3 h-3" />
              </button>
              <button 
                onClick={handleSaveProfile}
                className="p-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded"
              >
                <Check className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        <h3 className="flex items-center justify-center gap-2 font-oswald text-2xl font-bold uppercase tracking-wide mb-4">
          <span className="text-2xl" title="Player Nationality">{player.flag || '🌍'}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 line-clamp-1">{player.name}</span>
        </h3>

        {/* Achievement Badges */}
        {(isOnFire || isBrickWall || isGiantSlayer) && (
          <div className="flex flex-wrap justify-center gap-2 mb-4 w-full px-2">
            {isOnFire && (
              <span className="inline-flex flex-1 whitespace-nowrap items-center justify-center gap-1 text-[10px] font-bold px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded shadow-lg border border-red-400/50" title="On Fire (3+ Win Streak)">
                🔥 On Fire
              </span>
            )}
            {isBrickWall && (
              <span className="inline-flex flex-1 whitespace-nowrap items-center justify-center gap-1 text-[10px] font-bold px-2 py-1 bg-gradient-to-r from-slate-500 to-slate-700 text-white rounded shadow-lg border border-slate-400/50" title="Brick Wall (0 Goals Conceded in 3+ Games)">
                🛡️ Brick Wall
              </span>
            )}
            {isGiantSlayer && (
              <span className="inline-flex flex-1 whitespace-nowrap items-center justify-center gap-1 text-[10px] font-bold px-2 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded shadow-lg border border-purple-400/50" title="Giant Slayer (Beat #1 Ranked Player)">
                🗡️ Giant Slayer
              </span>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-3 gap-2 mt-auto">
          <div className="flex flex-col items-center p-2 rounded-xl bg-white/20 border border-white/20 backdrop-blur-md group-hover:bg-white/30 transition-colors">
            <Star className="w-4 h-4 text-indigo-400 mb-1" />
            <span className="text-xl font-bold font-oswald">{(player.matchesWon || 0) * 3 + (player.matchesDrawn || 0)}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest">Pts</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-xl bg-white/20 border border-white/20 backdrop-blur-md group-hover:bg-white/30 transition-colors">
            <Goal className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-xl font-bold font-oswald">{player.goals}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest">Goals</span>
          </div>
          <div className="flex flex-col items-center p-2 rounded-xl bg-white/20 border border-white/20 backdrop-blur-md group-hover:bg-white/30 transition-colors">
            <Trophy className="w-4 h-4 text-yellow-400 mb-1" />
            <span className="text-xl font-bold font-oswald">{player.leaguesWon}</span>
            <span className="text-[9px] text-slate-400 uppercase tracking-widest">Leagues</span>
          </div>
        </div>

        {/* Form Tracker (W-D-L) */}
        <div className="mt-3 text-xs font-oswald tracking-widest text-slate-400 flex gap-2">
          <span className="text-emerald-400" title="Wins">{player.matchesWon || 0}W</span> - 
          <span className="text-slate-300" title="Draws">{player.matchesDrawn || 0}D</span> - 
          <span className="text-red-400" title="Losses">{player.matchesLost || 0}L</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
