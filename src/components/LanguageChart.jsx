import React from 'react';

const LanguageChart = ({ submissions }) => {
  const languages = calculateLanguages(submissions);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300">
  <div className="flex items-center gap-3 mb-6">
    <i className="fas fa-code text-indigo-500 text-xl"></i>
    <h3 className="text-xl font-bold text-gray-800">Language Usage</h3>
  </div>
  
  <div className=" lg:flex-row gap-8 items-center">

    {/* Enhanced Language List */}
    <div className="flex-1 
    overflow-y-auto">
      <div className="grid gap-3 ">
        {Object.entries(languages)
          .sort((a, b) => b[1] - a[1])
          .map(([language, count], index) => {
            const percentage = (count / submissions.length) * 100;
            const colors = [
              'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-amber-500',
              'bg-emerald-500', 'bg-blue-500', 'bg-red-500', 'bg-orange-500'
            ];
            const color = colors[index % colors.length];
            const languageIcon = getLanguageIcon(language);

            return (
              <div 
                key={language} 
                className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md group cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-3 h-3 rounded-full ${color} shadow-sm group-hover:scale-125 transition-transform duration-200`}></div>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {languageIcon}
                    <span className="font-medium text-gray-700 text-sm truncate">
                      {getLanguageName(language)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 flex-1 min-w-0 justify-end">
                  {/* Progress Bar */}
                  <div className="flex-1 max-w-32 hidden sm:block">
                    <div className="w-full bg-gray-200/50 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${color} transition-all duration-500 group-hover:shadow-sm`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Count and Percentage */}
                  <div className="text-right whitespace-nowrap">
                    <div className="font-bold text-gray-800 text-sm">{count}</div>
                    <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      

    </div>
  </div>
</div>
  );
};
// Helper functions
const getLanguageIcon = (language) => {
  const icons = {
    'C++': <i className="fab fa-cuttlefish text-blue-500 text-xs"></i>,
    'C': <i className="fab fa-cuttlefish text-blue-600 text-xs"></i>,
    'Java': <i className="fab fa-java text-red-500 text-xs"></i>,
    'Python': <i className="fab fa-python text-yellow-500 text-xs"></i>,
    'JavaScript': <i className="fab fa-js-square text-yellow-400 text-xs"></i>,
    'TypeScript': <i className="fab fa-js-square text-blue-500 text-xs"></i>,
    'Go': <i className="fab fa-golang text-cyan-500 text-xs"></i>,
    'Rust': <i className="fas fa-gear text-orange-600 text-xs"></i>,
    'Kotlin': <i className="fas fa-mobile text-purple-500 text-xs"></i>,
    'Swift': <i className="fab fa-swift text-orange-500 text-xs"></i>,
  };
  
  const langKey = Object.keys(icons).find(key => 
    language.toLowerCase().includes(key.toLowerCase())
  );
  
  return langKey ? icons[langKey] : <i className="fas fa-code text-gray-400 text-xs"></i>;
};

const getLanguageName = (language) => {
  const shortNames = {
    'GNU C++': 'C++',
    'GNU C': 'C',
    'Python 3': 'Python',
    'Java 8': 'Java',
    'JavaScript': 'JS',
    'TypeScript': 'TS',
    'GNU C++11': 'C++11',
    'GNU C++14': 'C++14',
    'GNU C++17': 'C++17',
  };
  
  return shortNames[language] || language;
};

const calculateLanguages = (submissions) => {
  const languageCount = {};
  
  submissions.forEach(sub => {
    const lang = sub.programmingLanguage;
    languageCount[lang] = (languageCount[lang] || 0) + 1;
  });
  
  return languageCount;
};

export default LanguageChart;