import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLeague } from './context/LeagueContext';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children, requireAdmin }) => {
  const { currentUser } = useLeague();
  
  if (!currentUser) return <Navigate to="/login" />;
  if (requireAdmin && currentUser.role !== 'admin') return <Navigate to="/" />;
  
  return children;
};

function App() {
  const { currentUser } = useLeague();

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-indigo-500/30">
      {currentUser && <Navbar />}
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={
            !currentUser ? <Login /> : (currentUser.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/" />)
          } />
          
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          
          <Route path="/admin" element={
            <PrivateRoute requireAdmin={true}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
