import { ArrowRight } from 'lucide-react';
import PlayerCard from '../components/PlayerCard';
import { players } from '../data/players';

const PlayersPage = ({ navigateToPage }) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigateToPage('mainPage')}
          className="flex items-center text-green-700 hover:text-green-800 mr-4 bg-gray-100 px-3 py-1 rounded"
        >
          <ArrowRight size={20} className="ml-1" />
          العودة
        </button>
        <h1 className="text-2xl font-bold">صفحة اللاعبين</h1>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {players.map(player => (
          <PlayerCard
            key={player.id}
            player={player}
            onClick={() => navigateToPage('playerDetails', player)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayersPage; 