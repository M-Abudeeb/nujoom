import { useState } from 'react';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import PlayersPage from './pages/PlayersPage';
import ComparisonsPage from './pages/ComparisonsPage';
import PlayerDetailsPage from './pages/PlayerDetailsPage';
import MatchAnalysisPage from './pages/MatchAnalysisPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('mainPage');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const navigateToPage = (page, player = null) => {
    setCurrentPage(page);
    if (player) setSelectedPlayer(player);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'mainPage':
        return <MainPage navigateToPage={navigateToPage} />;
      case 'playersPage':
        return <PlayersPage navigateToPage={navigateToPage} />;
      case 'comparisons':
        return <ComparisonsPage navigateToPage={navigateToPage} />;
      case 'playerDetails':
        return <PlayerDetailsPage player={selectedPlayer} navigateToPage={navigateToPage} />;
      case 'matchAnalysis':
        return <MatchAnalysisPage navigateToPage={navigateToPage} />;
      default:
        return <MainPage navigateToPage={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header navigateToPage={navigateToPage} currentPage={currentPage} />
      <div className="container mx-auto px-6 py-4">
        {renderPage()}
      </div>
    </div>
  );
};

export default App; 