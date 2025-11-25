import React from 'react';

const ContestStats = ({ contests }) => {
  const stats = calculateContestStats(contests);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300">
  <div className="flex items-center gap-3 mb-6">
    <i className="fas fa-trophy text-purple-500 text-xl"></i>
    <h3 className="text-xl font-bold text-gray-800">Contest Statistics</h3>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <StatCard 
      title="Contests" 
      value={stats.contestsCount} 
      icon="fa-flag-checkered"
      color="blue"
    />
    <StatCard 
      title="Best Rank" 
      value={stats.bestRank} 
      icon="fa-crown"
      color="green"
    />
    <StatCard 
      title="Worst Rank" 
      value={stats.worstRank} 
      icon="fa-arrow-down"
      color="red"
    />
    <StatCard 
      title="Max Up" 
      value={stats.maxUp} 
      icon="fa-arrow-up"
      color="emerald"
    />
    <StatCard 
      title="Max Down" 
      value={stats.maxDown} 
      icon="fa-arrow-down"
      color="orange"
    />
  </div>
</div>
  );
};


const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    red: 'bg-red-50 border-red-200 text-red-600',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600'
  };

  return (
    <div className={`relative group cursor-pointer transform hover:scale-105 transition-all duration-300 ${colorClasses[color]} rounded-xl p-4 text-center border-2 hover:shadow-lg`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-xl"></div>
      </div>
      
      {/* Icon */}
      <div className="relative mb-2">
        <i className={`fas ${icon} text-2xl mb-2`}></i>
      </div>
      
      {/* Value */}
      <div className="relative text-2xl font-bold mb-1">{value}</div>
      
      {/* Title */}
      <div className="relative text-sm font-medium text-gray-600">{title}</div>
      
      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
    </div>
  );
};

const calculateContestStats = (contests) => {
  if (!contests || contests.length === 0) {
    return {
      contestsCount: 0,
      bestRank: '-',
      worstRank: '-',
      maxUp: '-',
      maxDown: '-'
    };
  }

  const ranks = contests.map(c => c.rank);
  const ratingChanges = contests.map(c => c.newRating - c.oldRating);

  return {
    contestsCount: contests.length,
    bestRank: Math.min(...ranks),
    worstRank: Math.max(...ranks),
    maxUp: Math.max(...ratingChanges),
    maxDown: Math.min(...ratingChanges)

  };
};

export default ContestStats;