import React from 'react';

const UserStats = ({ submissions }) => {
  const stats = calculateUserStats(submissions);

  return (
   <div className="bg-gradient-to-br from-white to-emerald-50/50 rounded-2xl shadow-xl border border-emerald-100/50 p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
  {/* Background decorative elements */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/5 to-cyan-500/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-700"></div>
  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/5 to-indigo-500/5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-700"></div>
  
  {/* Header with FontAwesome icon */}
  <div className="flex items-center gap-3 mb-8 relative z-10">
    <div className="p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-300">
      <i className="fas fa-chart-pie text-white text-xl"></i>
    </div>
    <div>
      <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        Problem Statistics
      </h3>
      <p className="text-gray-500 text-sm mt-1">
        <i className="fas fa-analytics mr-1"></i>
        Performance insights and solving patterns
      </p>
    </div>
  </div>

  {/* Enhanced Stats Grid with FontAwesome */}
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
    <StatCard 
      title="Tried" 
      value={stats.tried} 
      icon="fa-eye"
      gradient="from-blue-500 to-cyan-500"
      description="Problems attempted"
    />
    <StatCard 
      title="Solved" 
      value={stats.solved} 
      icon="fa-check-circle"
      gradient="from-emerald-500 to-green-500"
      description="Successfully solved"
    />
    <StatCard 
      title="Avg Attempts" 
      value={stats.avgAttempts.toFixed(2)} 
      icon="fa-retweet"
      gradient="from-amber-500 to-orange-500"
      description="Average per problem"
    />
    <StatCard 
      title="Max Attempts" 
      value={stats.maxAttempts} 
      icon="fa-chart-line"
      gradient="from-red-500 to-pink-500"
      description="Most attempts needed"
    />
    <StatCard 
      title="One Sub AC" 
      value={stats.oneSubmissionAC} 
      icon="fa-bolt"
      gradient="from-purple-500 to-indigo-500"
      description="Solved in one attempt"
    />
    <StatCard 
      title="Max AC" 
      value={stats.maxAC} 
      icon="fa-trophy"
      gradient="from-violet-500 to-purple-500"
      description="Highest AC count"
    />
  </div>

  {/* Progress bar for solved/tried ratio */}
  {stats.tried > 0 && (
    <div className="mt-6 pt-6 border-t border-gray-100/50 relative z-10">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
          <i className="fas fa-percentage text-emerald-500"></i>
          Success Rate
        </span>
        <span className="text-sm font-bold text-gray-700 flex items-center gap-1">
          {((stats.solved / stats.tried) * 100).toFixed(1)}%
          <i className="fas fa-chart-bar text-cyan-500"></i>
        </span>
      </div>
      <div className="w-full bg-gray-200/50 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2.5 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ width: `${(stats.solved / stats.tried) * 100}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine"></div>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

const StatCard = ({ title, value, icon, gradient, description }) => (
  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-100/50 hover:border-gray-200/70 hover:shadow-lg transition-all duration-300 group/card hover:scale-105">
    <div className="flex items-start justify-between mb-2">
      <div className={`p-2 bg-gradient-to-r ${gradient} rounded-lg shadow-sm group-hover/card:scale-110 transition-transform duration-300`}>
        <i className={`fas ${icon} text-white text-sm`}></i>
      </div>
      <div className="text-xs text-gray-400 font-medium px-2 py-1 bg-gray-100/50 rounded-full">
        {description}
      </div>
    </div>
    
    <div className="text-2xl font-bold text-gray-800 mb-1 group-hover/card:text-gray-900 transition-colors">
      {value}
    </div>
    <div className="text-sm font-medium text-gray-600 flex items-center gap-1">
      <i className={`fas ${icon} text-gray-400 text-xs`}></i>
      {title}
    </div>
    
    {/* Hover effect line */}
    <div className={`w-0 group-hover/card:w-full h-0.5 bg-gradient-to-r ${gradient} rounded-full transition-all duration-300 mt-2`}></div>
  </div>
);


const calculateUserStats = (submissions) => {
  const problems = new Map();
  const solvedProblems = new Set();
  
  submissions.forEach(sub => {
    const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
    
    if (!problems.has(problemId)) {
      problems.set(problemId, {
        attempts: 0,
        solved: false
      });
    }
    
    const problem = problems.get(problemId);
    problem.attempts++;
    
    if (sub.verdict === 'OK') {
      problem.solved = true;
      solvedProblems.add(problemId);
    }
  });

  const solvedEntries = Array.from(problems.entries()).filter(([_, data]) => data.solved);
  const attempts = solvedEntries.map(([_, data]) => data.attempts);
  
  // Calculate max AC (most problems solved with same number of attempts)
  const attemptsCount = {};
  solvedEntries.forEach(([_, data]) => {
    const key = data.attempts;
    attemptsCount[key] = (attemptsCount[key] || 0) + 1;
  });
  
  const maxAC = Object.keys(attemptsCount).length > 0 
    ? Math.max(...Object.values(attemptsCount))
    : 0;

  return {
    tried: problems.size,
    solved: solvedProblems.size,
    avgAttempts: attempts.length > 0 ? attempts.reduce((a, b) => a + b, 0) / attempts.length : 0,
    maxAttempts: attempts.length > 0 ? Math.max(...attempts) : 0,
    oneSubmissionAC: solvedEntries.filter(([_, data]) => data.attempts === 1).length,
    maxAC: maxAC
  };
};

export default UserStats;