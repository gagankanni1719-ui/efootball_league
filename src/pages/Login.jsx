import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeague } from '../context/LeagueContext';
import { Trophy, LogIn } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { players, setCurrentUser } = useLeague();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Admin login
    if (username === 'admin' && password === 'admin123') {
      setCurrentUser({ username: 'admin', role: 'admin' });
      navigate('/admin');
      return;
    }

    // Player login
    const player = players.find(p => p.username === username && p.password === password);
    if (player) {
      setCurrentUser({ ...player, role: 'player' });
      navigate('/');
      return;
    }

    setError('Invalid username or password');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="flex items-center gap-3 mb-10">
        <Trophy className="w-10 h-10 text-indigo-400" />
        <h1 className="font-oswald text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          eFOOTBALL LEAGUE
        </h1>
      </div>

      <div className="glassmorphism w-full max-w-md p-8 rounded-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/25"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400 space-y-2">
          {/* <p>Admin login: <code className="bg-slate-900 px-2 py-1 rounded">admin</code> / <code className="bg-slate-900 px-2 py-1 rounded">admin123</code></p> */}
          {/* <p>Player login: <code className="bg-slate-900 px-2 py-1 rounded">player1</code> / <code className="bg-slate-900 px-2 py-1 rounded">password</code></p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
