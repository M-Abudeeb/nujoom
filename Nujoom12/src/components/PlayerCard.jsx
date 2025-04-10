import { Eye, Star } from 'lucide-react';

const PlayerCard = ({ player, onClick }) => {
  // Calculate a rating out of 5 stars based on success rate
  const rating = Math.round((player.successRate / 100) * 5);
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">{player.name}</h3>
            <p className="text-gray-500">{player.team}</p>
          </div>
          <span className="text-gray-500">سنة {player.age}</span>
        </div>
      </div>

      {/* Center the rating */}
      <div className="flex flex-col items-center mb-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              fill={i < rating ? "#FFD700" : "none"}
              color={i < rating ? "#FFD700" : "#D1D5DB"}
              className="mx-1"
            />
          ))}
        </div>
        <div className="text-gray-500 text-sm mt-1">
          تقييم اللاعب
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center mb-4">
        <div>
          <div className="font-bold">{player.matches}</div>
          <div className="text-gray-500 text-sm">المباريات</div>
        </div>
        <div>
          <div className="font-bold">{player.successRate}%</div>
          <div className="text-gray-500 text-sm">نسبة النجاح</div>
        </div>
        <div>
          <div className="font-bold">{player.cardsCount}</div>
          <div className="text-gray-500 text-sm">بطاقات صفراء</div>
        </div>
      </div>

      <button 
        onClick={onClick}
        className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors duration-200 flex items-center justify-center"
      >
        <Eye size={16} className="ml-2" />
        عرض الملف
      </button>
    </div>
  );
};

export default PlayerCard; 