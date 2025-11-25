import React from 'react';

const TagChart = ({ submissions }) => {
  const tags = calculateTags(submissions);

  return (
   <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300">
  <div className="flex items-center gap-3 mb-6">
    <i className="fas fa-tags text-cyan-500 text-xl"></i>
    <h3 className="text-xl font-bold text-gray-800">Problem Tags</h3>
  </div>
  
  <div className="grid 
    grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
    max-h-[12rem] 
    overflow-y-auto
    gap-1">
    {Object.entries(tags)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count], index) => (
        <TagBar key={tag} tag={tag} count={count} index={index} />
      ))
    }
  </div>
</div>

  );
};


const TagBar = ({ tag, count, index }) => {
  const colors = [
    'bg-gradient-to-r from-blue-500 to-cyan-500',
    'bg-gradient-to-r from-purple-500 to-pink-500',
    'bg-gradient-to-r from-green-500 to-emerald-500',
    'bg-gradient-to-r from-amber-500 to-orange-500',
    'bg-gradient-to-r from-red-500 to-pink-500',
    'bg-gradient-to-r from-indigo-500 to-purple-500',
    'bg-gradient-to-r from-cyan-500 to-blue-500',
    'bg-gradient-to-r from-orange-500 to-red-500',
    'bg-gradient-to-r from-emerald-500 to-green-500',
    'bg-gradient-to-r from-violet-500 to-purple-500'
  ];

  const color = colors[index % colors.length];
  const tagIcon = getTagIcon(tag);

  return (
    <div className="flex items-center justify-between p-1 bg-white/50 rounded-xl border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md group cursor-pointer">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`w-2 h-8 rounded-full ${color} shadow-sm group-hover:scale-110 transition-transform duration-200`}></div>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {tagIcon}
          <span className="font-medium text-gray-700 text-sm truncate">
            {formatTagName(tag)}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-gray-800 bg-gray-100/50 px-2 py-1 rounded-lg min-w-12 text-center group-hover:bg-gray-100 transition-colors">
          {count}
        </span>
        <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-400 transition-colors"></div>
      </div>
    </div>
  );
};

// Helper functions
const getTagIcon = (tag) => {
  const tagIcons = {
    'dp': <i className="fas fa-project-diagram text-purple-500 text-xs"></i>,
    'math': <i className="fas fa-square-root-variable text-red-500 text-xs"></i>,
    'greedy': <i className="fas fa-chess-queen text-amber-500 text-xs"></i>,
    'graphs': <i className="fas fa-project-diagram text-green-500 text-xs"></i>,
    'strings': <i className="fas fa-text-height text-blue-500 text-xs"></i>,
    'data structures': <i className="fas fa-layer-group text-cyan-500 text-xs"></i>,
    'binary search': <i className="fas fa-search text-orange-500 text-xs"></i>,
    'sortings': <i className="fas fa-sort-amount-down text-indigo-500 text-xs"></i>,
    'geometry': <i className="fas fa-shapes text-pink-500 text-xs"></i>,
    'brute force': <i className="fas fa-hammer text-gray-500 text-xs"></i>,
    'implementation': <i className="fas fa-code text-gray-600 text-xs"></i>,
    'combinatorics': <i className="fas fa-infinity text-purple-500 text-xs"></i>,
    'number theory': <i className="fas fa-divide text-red-500 text-xs"></i>,
    'dfs': <i className="fas fa-sitemap text-green-500 text-xs"></i>,
    'bfs': <i className="fas fa-wave-square text-blue-500 text-xs"></i>,
    'tree': <i className="fas fa-tree text-emerald-500 text-xs"></i>,
    'bitmask': <i className="fas fa-mask text-amber-500 text-xs"></i>,
  };

  const tagKey = Object.keys(tagIcons).find(key => 
    tag.toLowerCase().includes(key.toLowerCase())
  );
  
  return tagKey ? tagIcons[tagKey] : <i className="fas fa-tag text-gray-400 text-xs"></i>;
};

const formatTagName = (tag) => {
  // Convert snake_case to Title Case and replace underscores with spaces
  return tag
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const calculateTags = (submissions) => {
  const tagCount = {};
  
  submissions.forEach(sub => {
    if (sub.verdict === 'OK') {
      sub.problem.tags?.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });
  
  return tagCount;
};

export default TagChart;