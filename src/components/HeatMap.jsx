import React from 'react';

const HeatMap = ({ submissions }) => {
  const heatmapData = generateHeatmapData(submissions);

  return (<div className=''>
    <div className="flex items-center gap-3 mb-6">
      <i className="fas fa-calendar-alt text-red-500 text-xl"></i>
      <h3 className="text-xl font-bold text-gray-800">Submission Heatmap</h3>
    </div>


  <div className="flex justify-center overflow-x-auto">
  <div className="inline-block">
    <div className="grid grid-flow-col auto-cols-[1rem] gap-1 p-2 bg-white/50 rounded-xl">
      {heatmapData.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-1">
          {week.map((day, dayIndex) => (
            <div
              key={dayIndex}
              className={`
                w-4 h-4 transition-all duration-200 
                transform hover:scale-125 hover:z-10 hover:shadow-lg 
                ${
                  day.count === 0 ? 'bg-gray-100 hover:bg-gray-200' :
                  day.count < 3 ? 'bg-green-300 hover:bg-green-400' :
                  day.count < 6 ? 'bg-green-500 hover:bg-green-600' :
                  day.count < 10 ? 'bg-green-700 hover:bg-green-800' :
                  'bg-green-900 hover:bg-green-950'
                }
                relative group cursor-pointer
              `}
              title={`${day.date}: ${day.count} submissions`}
            >
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                bg-gray-800 text-white text-xs px-2 py-1 rounded-lg 
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none whitespace-nowrap z-20">
                <div className="font-semibold">{day.date}</div>
                <div>{day.count} submission{day.count !== 1 ? 's' : ''}</div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 
                  w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
</div>

    {/* Enhanced Legend */}
    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100/50">


      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-gray-100 rounded-sm transition-transform hover:scale-125"></div>
          <div className="w-3 h-3 bg-green-300 rounded-sm transition-transform hover:scale-125"></div>
          <div className="w-3 h-3 bg-green-500 rounded-sm transition-transform hover:scale-125"></div>
          <div className="w-3 h-3 bg-green-700 rounded-sm transition-transform hover:scale-125"></div>
          <div className="w-3 h-3 bg-green-900 rounded-sm transition-transform hover:scale-125"></div>
        </div>
        <span className="text-xs text-gray-500 font-medium mx-2">Activity</span>
      </div>


    </div>



    {/* Current streak */}
    {(() => {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      let streak = 0;

      // Check current streak
      for (let i = heatmapData.flat().length - 1; i >= 0; i--) {
        const day = heatmapData.flat()[i];
        if (day.date === todayStr || (day.count > 0 && new Date(day.date) <= today)) {
          streak++;
        } else {
          break;
        }
      }

      if (streak > 1) {
        return (
          <div className="mt-4 pt-4 border-t border-gray-100/50 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              <i className="fas fa-fire"></i>
              <span>Current Streak: {streak} days</span>
            </div>
          </div>
        );
      }
    })()}
  </div>);
};

const generateHeatmapData = (submissions) => {
  const now = new Date();
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

  // Create empty calendar data structure (53 weeks × 7 days)
  const weeks = Array(53).fill().map(() =>
    Array(7).fill().map(() => ({ count: 0, date: '' }))
  );

  // Count submissions per day
  const dailyCounts = {};
  if (submissions && submissions.length > 0) {
    submissions.forEach(sub => {
      const date = new Date(sub.creationTimeSeconds * 1000);
      if (date >= oneYearAgo) {
        const dateStr = date.toISOString().split('T')[0];
        dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + 1;
      }
    });
  }

  // Fill the calendar
  let currentDate = new Date(oneYearAgo);
  let weekIndex = 0;

  while (currentDate <= now) {
    const dayIndex = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const dateStr = currentDate.toISOString().split('T')[0];

    if (weekIndex < 53) {
      weeks[weekIndex][dayIndex] = {
        count: dailyCounts[dateStr] || 0,
        date: dateStr
      };
    }

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);

    // If we've reached Sunday, move to next week
    if (currentDate.getDay() === 0) {
      weekIndex++;
    }
  }

  return weeks;
};

export default HeatMap;