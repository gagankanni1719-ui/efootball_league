import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Trophy, Goal, Camera, Check, X } from 'lucide-react';
import { useLeague } from '../context/LeagueContext';

const PlayerCard = ({ player, isCurrentUser, isTopScorer, isLeagueLeader }) => {
  const { updatePlayerImage, updatePlayerFlag } = useLeague();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [newPfpUrl, setNewPfpUrl] = useState(player.image);
  const [newFlag, setNewFlag] = useState(player.flag || '🌍');

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
      "hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20",
      isCurrentUser ? "ring-2 ring-indigo-500 ring-offset-4 ring-offset-slate-950 scale-[1.02]" : "border border-white/10"
    )}>
      {/* Background Gradient */}
      <div className={clsx(
        "absolute inset-0 opacity-80 transition-opacity group-hover:opacity-100",
        isTopScorer 
          ? "bg-gradient-to-br from-orange-600 via-red-900 to-slate-900" 
          : isLeagueLeader 
            ? "bg-gradient-to-br from-yellow-500 via-yellow-800 to-slate-900"
            : "bg-gradient-to-br from-indigo-900 via-slate-800 to-slate-950"
      )} />

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />

      {/* Content */}
      <div className="relative p-6 flex flex-col items-center h-full z-10 glassmorphism bg-transparent border-none">
        
        {/* Badges */}
        <div className="absolute top-4 w-full px-4 flex justify-between">
          {isTopScorer && (
            <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-md shadow-lg shadow-red-900/50">
              🔥 TOP SCORER
            </span>
          )}
          {isLeagueLeader && !isTopScorer && (
            <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-950 rounded-md shadow-lg shadow-yellow-900/50">
              👑 LEADER
            </span>
          )}
          {isCurrentUser && (
            <span className="ml-auto text-xs font-bold px-2 py-1 bg-indigo-500 rounded-md shadow-lg shadow-indigo-900/50">
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

        <h3 className="flex items-center justify-center gap-2 font-oswald text-2xl font-bold uppercase tracking-wide mb-6">
          <span className="text-2xl" title="Player Nationality">{player.flag || '🌍'}</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 line-clamp-1">{player.name}</span>
        </h3>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-4 mt-auto">
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
            <Goal className="w-5 h-5 text-emerald-400 mb-1" />
            <span className="text-2xl font-bold font-oswald">{player.goals}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Goals</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/10 transition-colors">
            <Trophy className="w-5 h-5 text-yellow-400 mb-1" />
            <span className="text-2xl font-bold font-oswald">{player.leaguesWon}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">Leagues</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
