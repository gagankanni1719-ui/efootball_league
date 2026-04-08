import React from 'react';
import { useLeague } from '../context/LeagueContext';
import { LogOut, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser, setCurrentUser } = useLeague();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-indigo-400" />
          <span className="font-oswald text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            eFOOTBALL LEAGUE
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-slate-400 uppercase tracking-wider">Logged in as</span>
            <span className="text-sm font-semibold text-slate-200">
              {currentUser?.name || 'Admin'}
            </span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-red-500/10 hover:text-red-400 transition-colors border border-white/5 hover:border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
