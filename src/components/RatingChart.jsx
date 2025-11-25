import React from 'react';

const RatingChart = ({ submissions }) => {
  const ratings = calculateRatings(submissions);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300">
  <div className="flex items-center gap-3 mb-6">
    <i className="fas fa-star text-amber-500 text-xl"></i>
    <h3 className="text-xl font-bold text-gray-800">Problem Ratings</h3>
  </div>
  
  <div className="grid 
    grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
    max-h-[12rem] 
    overflow-y-auto
    gap-1">  
  {Object.entries(ratings)
      .sort((a, b) => {
        if (a[0] === 'Unrated') return 1;
        if (b[0] === 'Unrated') return -1;
        return parseInt(a[0]) - parseInt(b[0]);
      })
      .map(([rating, count]) => (
        <RatingBar 
          key={rating} 
          rating={rating} 
          count={count} 
          maxCount={Math.max(...Object.values(ratings))} 
        />
      ))
    }
  </div>

  {/* Summary section */}
  <div className="mt-6 pt-4 border-t border-gray-100/50">
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-600 font-medium">Total Problems</span>
      <span className="font-bold text-gray-800">
        {Object.values(ratings).reduce((a, b) => a + b, 0)}
      </span>
    </div>
  </div>
</div>
  );
};
const RatingBar = ({ rating, count, maxCount }) => {
  const getRatingColor = (rating) => {
    if (rating === 'Unrated') return {
      text: 'text-gray-600',
      bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
      badge: 'bg-gray-100 text-gray-700'
    };
    
    const r = parseInt(rating);
    if (r < 1200) return {
      text: 'text-gray-700',
      bg: 'bg-gradient-to-r from-gray-400 to-gray-500',
      badge: 'bg-gray-100 text-gray-700'
    };
    if (r < 1400) return {
      text: 'text-green-700',
      bg: 'bg-gradient-to-r from-green-400 to-green-500',
      badge: 'bg-green-100 text-green-700'
    };
    if (r < 1600) return {
      text: 'text-cyan-700',
      bg: 'bg-gradient-to-r from-cyan-400 to-cyan-500',
      badge: 'bg-cyan-100 text-cyan-700'
    };
    if (r < 1900) return {
      text: 'text-blue-700',
      bg: 'bg-gradient-to-r from-blue-400 to-blue-500',
      badge: 'bg-blue-100 text-blue-700'
    };
    if (r < 2100) return {
      text: 'text-purple-700',
      bg: 'bg-gradient-to-r from-purple-400 to-purple-500',
      badge: 'bg-purple-100 text-purple-700'
    };
    if (r < 2400) return {
      text: 'text-orange-700',
      bg: 'bg-gradient-to-r from-orange-400 to-orange-500',
      badge: 'bg-orange-100 text-orange-700'
    };
    return {
      text: 'text-red-700',
      bg: 'bg-gradient-to-r from-red-400 to-red-500',
      badge: 'bg-red-100 text-red-700'
    };
  };

  const getRatingIcon = (rating) => {
    if (rating === 'Unrated') return 'fa-question-circle';
    const r = parseInt(rating);
    if (r < 1200) return 'fa-user';
    if (r < 1400) return 'fa-leaf';
    if (r < 1600) return 'fa-feather';
    if (r < 1900) return 'fa-rocket';
    if (r < 2100) return 'fa-crown';
    if (r < 2400) return 'fa-fire';
    return 'fa-trophy';
  };

  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
  const color = getRatingColor(rating);

  return (
    <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md group cursor-pointer">
      {/* Rating label with icon */}
      <div className="flex items-center gap-3 w-28">
        <div className={`p-2 rounded-lg ${color.badge} group-hover:scale-110 transition-transform duration-200`}>
          <i className={`fas ${getRatingIcon(rating)} ${color.text} text-sm`}></i>
        </div>
        <span className={`font-semibold text-sm ${color.text}`}>
          {rating}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex-1 mx-3">
        <div className="w-full bg-gray-200/50 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-3 rounded-full ${color.bg} transition-all duration-500 ease-out group-hover:shadow-sm relative overflow-hidden`}
            style={{ width: `${percentage}%` }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine"></div>
          </div>
        </div>
      </div>

      {/* Count with animated badge */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-gray-800 bg-gray-100/50 px-3 py-1 rounded-lg min-w-12 text-center group-hover:bg-gray-100 transition-colors">
          {count}
        </span>
        <div className={`w-2 h-2 rounded-full ${color.bg.split(' ')[0]} opacity-70 group-hover:opacity-100 transition-opacity`}></div>
      </div>
    </div>
  );
};


const calculateRatings = (submissions) => {
  const ratingCount = {};
  
  submissions.forEach(sub => {
    if (sub.verdict === 'OK') {
      const rating = sub.problem.rating || 'Unrated';
      ratingCount[rating] = (ratingCount[rating] || 0) + 1;
    }
  });
  
  return ratingCount;
};

export default RatingChart;