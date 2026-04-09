import React from 'react';
import { useLeague } from '../context/LeagueContext';
import PlayerCard from '../components/PlayerCard';
import Leaderboard from '../components/Leaderboard';

const Home = () => {
  const { players, currentUser } = useLeague();

  // Find top scorer
  const maxGoals = Math.max(...players.map(p => p.goals));
  const topScorerIds = players.filter(p => p.goals === maxGoals && maxGoals > 0).map(p => p.id);

  // Find league leader (by points now)
  const playersWithPoints = players.map(p => ({
    ...p,
    points: (p.matchesWon || 0) * 3 + (p.matchesDrawn || 0) * 1
  }));
  const maxPoints = Math.max(...playersWithPoints.map(p => p.points));
  const leagueLeaderIds = playersWithPoints.filter(p => p.points === maxPoints && maxPoints > 0).map(p => p.id);

  return (
    <div className="space-y-12">
      <section>
        <h2 className="font-oswald text-3xl mb-8 border-b border-white/10 pb-4 inline-block">THE SQUAD</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {players.map(player => (
            <PlayerCard 
              key={player.id} 
              player={player} 
              isCurrentUser={currentUser?.id === player.id}
              isTopScorer={topScorerIds.includes(player.id)}
              isLeagueLeader={leagueLeaderIds.includes(player.id)}
            />
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto">
        <Leaderboard players={players} />
      </section>
    </div>
  );
};

export default Home;
