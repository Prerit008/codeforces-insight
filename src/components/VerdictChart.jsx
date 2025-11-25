import React from 'react';

const VerdictChart = ({ submissions }) => {
  const verdicts = calculateVerdicts(submissions);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300">
  <div className="flex items-center gap-3">
    <i className="fas fa-chart-pie text-purple-500 text-xl"></i>
    <h3 className="text-xl font-bold text-gray-800">Verdict Distribution</h3>
  </div>
  
  

  <div className="lg:flex-row gap-8 items-center">
    {/* Pie Chart Container */}
    <div className="relative max-w-2/3 h-auto flex-shrink-0 mx-auto p-6">
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
        {(() => {
          let currentAngle = 0;
          const total = submissions.length;
          const verdictsArray = Object.entries(verdicts).filter(([_, count]) => count > 0);
          
          return verdictsArray.map(([verdict, count], index) => {
            const percentage = (count / total) * 100;
            const angle = (percentage / 100) * 360;
            const largeArcFlag = percentage > 50 ? 1 : 0;
            
            const startX = 50 + 50 * Math.cos(currentAngle * Math.PI / 180);
            const startY = 50 + 50 * Math.sin(currentAngle * Math.PI / 180);
            const endX = 50 + 50 * Math.cos((currentAngle + angle) * Math.PI / 180);
            const endY = 50 + 50 * Math.sin((currentAngle + angle) * Math.PI / 180);
            
            const pathData = [
              `M 50 50`,
              `L ${startX} ${startY}`,
              `A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              'Z'
            ].join(' ');
            
            const segmentColor = getVerdictColor(verdict);
            const segment = (
              <path
                key={verdict}
                d={pathData}
                fill={segmentColor}
                stroke="white"
                strokeWidth="0.1"
                className="transition-all duration-500 hover:opacity-80 cursor-pointer"
                onMouseEnter={(e) => {
                  e.target.style.opacity = '0.8';
                  e.target.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1';
                  e.target.style.filter = 'brightness(1)';
                }}
              />
            );
            
            currentAngle += angle;
            return segment;
          });
        })()}
        
        {/* Center circle */}
        <circle cx="50" cy="50" r="20" fill="white" />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{submissions.length}</div>
          <div className="text-xs text-gray-500">Total</div>
        </div>
      </div>
    </div>

    {/* Legend */}
    <div className="flex-1
    overflow-y-auto">
      <div className="grid gap-2 
    grid-cols-2 gap-2">
        {Object.entries(verdicts)
          .filter(([_, count]) => count > 0)
          .sort(([_, a], [__, b]) => b - a)
          .map(([verdict, count]) => {
            const percentage = (count / submissions.length) * 100;
            const color = getVerdictColor(verdict);
            
            return (
              <div 
                key={verdict} 
                className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-gray-100 hover:bg-white/80 transition-all duration-200 hover:shadow-md group cursor-pointer"
                onMouseEnter={() => {
                  // You could add highlight effect to corresponding pie segment here
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700 text-sm">
                      {getVerdictLabel(verdict)}
                    </span>
                    {verdict === 'OK' && <i className="fas fa-check text-green-500 text-xs"></i>}
                    {verdict === 'WRONG_ANSWER' && <i className="fas fa-times text-red-500 text-xs"></i>}
                    {verdict === 'TIME_LIMIT_EXCEEDED' && <i className="fas fa-clock text-yellow-500 text-xs"></i>}
                    {verdict === 'COMPILATION_ERROR' && <i className="fas fa-code text-orange-500 text-xs"></i>}
                    {verdict === 'RUNTIME_ERROR' && <i className="fas fa-bug text-purple-500 text-xs"></i>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800 text-sm">{count}</div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
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

const VerdictBar = ({ verdict, count, total }) => {
  const percentage = (count / total) * 100;
  const getColor = (verdict) => {
    switch(verdict) {
      case 'OK': return 'bg-green-500';
      case 'WRONG_ANSWER': return 'bg-red-500';
      case 'TIME_LIMIT_EXCEEDED': return 'bg-yellow-500';
      case 'COMPILATION_ERROR': return 'bg-orange-500';
      case 'RUNTIME_ERROR': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700 w-32 truncate">{verdict}</span>
      <div className="flex-1 mx-2">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className={`h-4 rounded-full ${getColor(verdict)} transition-all duration-300`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-700 w-12 text-right">
        {count} ({percentage.toFixed(1)}%)
      </span>
    </div>
  );
};
const getVerdictColor = (verdict) => {
  switch(verdict) {
    case 'OK': return '#10B981'; // green-500
    case 'WRONG_ANSWER': return '#EF4444'; // red-500
    case 'TIME_LIMIT_EXCEEDED': return '#F59E0B'; // yellow-500
    case 'COMPILATION_ERROR': return '#F97316'; // orange-500
    case 'RUNTIME_ERROR': return '#8B5CF6'; // purple-500
    case 'MEMORY_LIMIT_EXCEEDED': return '#EC4899'; // pink-500
    case 'PRESENTATION_ERROR': return '#6B7280'; // gray-500
    default: return '#3B82F6'; // blue-500
  }
};

const getVerdictLabel = (verdict) => {
  const labels = {
    'OK': 'Accepted',
    'WRONG_ANSWER': 'Wrong Answer',
    'TIME_LIMIT_EXCEEDED': 'Time Limit',
    'COMPILATION_ERROR': 'Compilation Error',
    'RUNTIME_ERROR': 'Runtime Error',
    'MEMORY_LIMIT_EXCEEDED': 'Memory Limit',
    'PRESENTATION_ERROR': 'Presentation Error',
  };
  return labels[verdict] || verdict;
};

const calculateVerdicts = (submissions) => {
  const verdictCount = {};
  
  submissions.forEach(sub => {
    const verdict = sub.verdict || 'OTHER';
    verdictCount[verdict] = (verdictCount[verdict] || 0) + 1;
  });
  
  return verdictCount;
};

export default VerdictChart;