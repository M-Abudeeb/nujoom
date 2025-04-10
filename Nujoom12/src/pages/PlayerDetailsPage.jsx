import { ArrowRight } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

const PlayerDetailsPage = ({ player, navigateToPage }) => {
  if (!player) {
    return <div>لا يوجد لاعب محدد</div>;
  }

  // بيانات للرسم البياني الشريطي
  const performanceData = [
    { name: 'المباريات', value: player.matches, fill: '#8884d8' },
    { name: 'نسبة النجاح', value: player.successRate, fill: '#82ca9d' },
    { name: 'البطاقات الصفراء', value: player.cardsCount, fill: '#ffc658' },
  ];

  // بيانات للرسم البياني الخطي (أداء افتراضي على مدار 6 أشهر)
  const monthlyPerformance = [
    { month: 'يناير', performance: Math.floor(Math.random() * 20) + 70 },
    { month: 'فبراير', performance: Math.floor(Math.random() * 20) + 70 },
    { month: 'مارس', performance: Math.floor(Math.random() * 20) + 70 },
    { month: 'أبريل', performance: Math.floor(Math.random() * 20) + 70 },
    { month: 'مايو', performance: Math.floor(Math.random() * 20) + 70 },
    { month: 'يونيو', performance: Math.floor(Math.random() * 20) + 70 },
  ];

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigateToPage('playersPage')}
          className="flex items-center text-green-700 hover:text-green-800 mr-4 bg-gray-100 px-3 py-1 rounded"
        >
          <ArrowRight size={20} className="ml-1" />
          العودة
        </button>
        <h1 className="text-2xl font-bold">تفاصيل اللاعب</h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">{player.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><span className="font-bold">النادي:</span> {player.team}</p>
            <p><span className="font-bold">العمر:</span> {player.age} سنة</p>
            <p><span className="font-bold">نسبة النجاح:</span> {player.successRate}%</p>
            <p><span className="font-bold">عدد المباريات:</span> {player.matches}</p>
            <p><span className="font-bold">البطاقات الصفراء:</span> {player.cardsCount}</p>
          </div>
        </div>
      </div>

      {/* قسم الرسوم البيانية */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-6">إحصائيات اللاعب</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الرسم البياني الشريطي */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">أداء اللاعب</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="القيمة" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* الرسم البياني الخطي */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">الأداء الشهري</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="performance" name="الأداء" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailsPage; 