import { Bell, User } from 'lucide-react';

const Header = ({ navigateToPage, currentPage }) => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div 
              className={`text-green-700 cursor-pointer flex items-center ml-8 ${currentPage === 'mainPage' ? 'font-bold' : 'font-normal'}`}
              onClick={() => navigateToPage('mainPage')}
            >
              نجوم
            </div>
            <nav>
              <ul className="flex space-x-8 space-x-reverse">
                <li>
                  <button 
                    className={`hover:text-green-700 focus:outline-none ${currentPage === 'playersPage' ? 'font-bold text-green-700' : ''}`}
                    onClick={() => navigateToPage('playersPage')}
                  >
                    المواهب
                  </button>
                </li>
                <li>
                  <button 
                    className={`hover:text-green-700 focus:outline-none ${currentPage === 'comparisons' ? 'font-bold text-green-700' : ''}`}
                    onClick={() => navigateToPage('comparisons')}
                  >
                    المقارنات
                  </button>
                </li>
                <li>
                  <button 
                    className={`hover:text-green-700 focus:outline-none ${currentPage === 'matchAnalysis' ? 'font-bold text-green-700' : ''}`}
                    onClick={() => navigateToPage('matchAnalysis')}
                  >
                    اكتشاف المواهب
                  </button>
                </li>
                <li>
                  <button className="hover:text-green-700 focus:outline-none">التقارير</button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="px-3">EN</button>
            <button className="p-2">
              <Bell size={20} />
            </button>
            <button className="p-2">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 