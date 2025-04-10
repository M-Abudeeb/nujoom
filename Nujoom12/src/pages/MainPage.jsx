import { useState } from 'react';
import { Grid, List, ArrowLeft } from 'lucide-react';
import PlayerCard from '../components/PlayerCard';
import { players } from '../data/players';

const MainPage = ({ navigateToPage }) => {
  const [viewMode, setViewMode] = useState('grid');
  
  // Select only 5 players with the highest success rates
  const featuredPlayers = [...players]
    .sort((a, b) => b.successRate - a.successRate)
    .slice(0, 5);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-green-700 text-white p-8 rounded-lg mb-10">
        <h1 className="text-3xl font-bold mb-4">اكتشف المواهب الكروية الخفية</h1>
        <p className="text-xl mb-6">منصة نجوم - الرائدة في اكتشاف وإبراز المواهب الكروية في المملكة العربية السعودية</p>
        <button 
          onClick={() => navigateToPage('playersPage')}
          className="bg-white text-green-700 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center"
        >
          استكشف المواهب
          <ArrowLeft size={16} className="mr-2" />
        </button>
      </div>

      {/* About Section */}
      <div className="bg-white p-8 rounded-lg shadow-sm mb-10">
        <h2 className="text-2xl font-bold mb-6">عن المنصة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              منصة <span className="font-bold text-green-700">نجوم</span> هي منصة متخصصة في اكتشاف المواهب الكروية الخفية في المملكة العربية السعودية، تهدف إلى إبراز اللاعبين الموهوبين الذين لم يحظوا بالاهتمام الكافي.
            </p>
            <p className="mb-4">
              تستخدم المنصة تقنيات الذكاء الاصطناعي المتقدمة لتحليل مقاطع الفيديو من المباريات واستخراج البيانات والإحصائيات بشكل آلي، مما يساعد في اكتشاف المواهب التي قد تمر دون ملاحظة بالطرق التقليدية.
            </p>
            <p>
              تتميز منصة نجوم بارتباطها المباشر مع <span className="font-bold">SAFF+</span> (الاتحاد السعودي لكرة القدم)، مما يضمن تحديث البيانات بشكل مستمر وفوري، ويتيح للمواهب الشابة فرصة الظهور أمام المدربين والكشافين.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">مميزات المنصة</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">1</span>
                <span>اكتشاف المواهب الخفية باستخدام تقنيات الذكاء الاصطناعي</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">2</span>
                <span>تحليل شامل لأداء اللاعبين وإبراز نقاط القوة لديهم</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">3</span>
                <span>منصة تواصل بين المواهب والأندية والمدربين</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">4</span>
                <span>تكامل مباشر مع بيانات SAFF+ لضمان الدقة والمصداقية</span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-100 text-green-700 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1">5</span>
                <span>فرصة للاعبين من مختلف المناطق للظهور على الساحة الكروية</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Featured Players Section */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">المواهب البارزة</h2>
          <div className="flex space-x-2 space-x-reverse">
            <button 
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </button>
            <button 
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-700 text-white' : 'bg-gray-200'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-4'}>
          {featuredPlayers.map(player => (
            <PlayerCard
              key={player.id}
              player={player}
              onClick={() => navigateToPage('playerDetails', player)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigateToPage('playersPage')}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition-colors duration-200"
          >
            عرض جميع المواهب
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;