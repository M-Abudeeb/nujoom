import { useState } from 'react';
import { players } from '../data/players';
import { Grid, List, ArrowRight } from 'lucide-react';
import StatsRadarChart from '../components/StatsRadarChart';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const ComparisonsPage = ({ navigateToPage }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');

  const handlePlayerSelect = (player) => {
    if (selectedPlayers.find(p => p.id === player.id)) {
      // Remove player if already selected
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
    } else if (selectedPlayers.length < 3) {
      // Add player if less than 3 are selected
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const filteredPlayers = players.filter(player => 
    player.name.includes(searchTerm) || 
    player.team.includes(searchTerm)
  );

  // Generate comparison data for bar chart
  const barChartData = [
    { name: 'المباريات', ...selectedPlayers.reduce((acc, player) => ({ ...acc, [player.name]: player.matches }), {}) },
    { name: 'نسبة التصديات', ...selectedPlayers.reduce((acc, player) => ({ ...acc, [player.name]: player.successRate }), {}) },
    { name: 'البطاقات الصفراء', ...selectedPlayers.reduce((acc, player) => ({ ...acc, [player.name]: player.cardsCount }), {}) },
  ];

  // Generate data for radar chart
  const generateRadarData = () => {
    // Generate random skills data for demonstration
    const skills = ['التمرير', 'التسديد', 'المراوغة', 'الدفاع', 'السرعة', 'القوة'];
    
    return selectedPlayers.map(player => {
      const skillsData = {};
      skills.forEach(skill => {
        // Generate a random value between 60-100 for each skill
        skillsData[skill] = Math.floor(Math.random() * 40) + 60;
      });
      
      return {
        player: player.name,
        ...skillsData
      };
    });
  };

  const radarData = generateRadarData();

  // Colors for the charts
  const colors = ['#8884d8', '#82ca9d', '#ffc658'];

  return (
    <div className="min-h-screen">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigateToPage('mainPage')}
          className="flex items-center text-green-700 hover:text-green-800 mr-4 bg-gray-100 px-3 py-1 rounded"
        >
          <ArrowRight size={20} className="ml-1" />
          العودة
        </button>
        <h1 className="text-2xl font-bold">صفحة المقارنات</h1>
      </div>
      <p>محتوى صفحة المقارنات</p>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">مقارنة اللاعبين</h1>
          <div className="flex space-x-2 space-x-reverse">
            <button 
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
            <button 
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Player Selection Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-bold mb-4">اختر اللاعبين للمقارنة (حتى 3 لاعبين)</h2>
          
          <div className="mb-4">
            <input
              type="text"
              placeholder="ابحث عن لاعب..."
              className="w-full p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">اللاعبون المختارون:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedPlayers.length > 0 ? (
                selectedPlayers.map(player => (
                  <div 
                    key={player.id} 
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center"
                  >
                    {player.name}
                    <button 
                      className="ml-2 text-green-700 hover:text-green-900"
                      onClick={() => handlePlayerSelect(player)}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">لم يتم اختيار أي لاعب بعد</p>
              )}
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">اللاعب</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">النادي</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نسبة النجاح</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlayers.map(player => (
                  <tr key={player.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{player.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.team}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{player.successRate}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handlePlayerSelect(player)}
                        className={`px-3 py-1 rounded-md ${
                          selectedPlayers.find(p => p.id === player.id)
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : selectedPlayers.length >= 3
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                        disabled={selectedPlayers.length >= 3 && !selectedPlayers.find(p => p.id === player.id)}
                      >
                        {selectedPlayers.find(p => p.id === player.id) ? 'إلغاء' : 'اختيار'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Charts Section */}
        {selectedPlayers.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-6">مقارنة الإحصائيات</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Bar Chart */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">مقارنة الإحصائيات الأساسية</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedPlayers.map((player, index) => (
                      <Bar key={player.id} dataKey={player.name} fill={colors[index]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Radar Chart */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-center">مقارنة المهارات</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart outerRadius={150} data={[
                    { subject: 'التمرير', A: radarData[0]?.['التمرير'] || 0, B: radarData[1]?.['التمرير'] || 0, C: radarData[2]?.['التمرير'] || 0 },
                    { subject: 'التسديد', A: radarData[0]?.['التسديد'] || 0, B: radarData[1]?.['التسديد'] || 0, C: radarData[2]?.['التسديد'] || 0 },
                    { subject: 'المراوغة', A: radarData[0]?.['المراوغة'] || 0, B: radarData[1]?.['المراوغة'] || 0, C: radarData[2]?.['المراوغة'] || 0 },
                    { subject: 'الدفاع', A: radarData[0]?.['الدفاع'] || 0, B: radarData[1]?.['الدفاع'] || 0, C: radarData[2]?.['الدفاع'] || 0 },
                    { subject: 'السرعة', A: radarData[0]?.['السرعة'] || 0, B: radarData[1]?.['السرعة'] || 0, C: radarData[2]?.['السرعة'] || 0 },
                    { subject: 'القوة', A: radarData[0]?.['القوة'] || 0, B: radarData[1]?.['القوة'] || 0, C: radarData[2]?.['القوة'] || 0 },
                  ]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    {selectedPlayers.length > 0 && <Radar name={selectedPlayers[0]?.name} dataKey="A" stroke={colors[0]} fill={colors[0]} fillOpacity={0.2} />}
                    {selectedPlayers.length > 1 && <Radar name={selectedPlayers[1]?.name} dataKey="B" stroke={colors[1]} fill={colors[1]} fillOpacity={0.2} />}
                    {selectedPlayers.length > 2 && <Radar name={selectedPlayers[2]?.name} dataKey="C" stroke={colors[2]} fill={colors[2]} fillOpacity={0.2} />}
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Player Details Comparison */}
            <div>
              <h3 className="text-lg font-semibold mb-4">تفاصيل اللاعبين</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">البيانات</th>
                      {selectedPlayers.map(player => (
                        <th key={player.id} className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {player.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">النادي</td>
                      {selectedPlayers.map(player => (
                        <td key={player.id} className="px-6 py-4 whitespace-nowrap">{player.team}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">العمر</td>
                      {selectedPlayers.map(player => (
                        <td key={player.id} className="px-6 py-4 whitespace-nowrap">{player.age} سنة</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">نسبة التصديات</td>
                      {selectedPlayers.map(player => (
                        <td key={player.id} className="px-6 py-4 whitespace-nowrap">{player.successRate}%</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">عدد المباريات</td>
                      {selectedPlayers.map(player => (
                        <td key={player.id} className="px-6 py-4 whitespace-nowrap">{player.matches}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">البطاقات الصفراء</td>
                      {selectedPlayers.map(player => (
                        <td key={player.id} className="px-6 py-4 whitespace-nowrap">{player.cardsCount}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonsPage; 