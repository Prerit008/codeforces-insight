import React, { useState } from 'react';

const UnsolvedProblems = ({ submissions }) => {
  const unsolved = getUnsolvedProblems(submissions);
  const displayProblems = unsolved;

  return (
    <div className="bg-white/80 backdrop-blur-sm transition-all duration-300">
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <i className="fas fa-bug text-red-500 text-xl"></i>
      <h3 className="text-xl font-bold text-gray-800">Unsolved Problems</h3>
    </div>
    <span className="text-sm font-medium text-gray-600 bg-gray-100/50 px-3 py-1 rounded-full">
      {unsolved.length} problems
    </span>
  </div>
  
  {/* Table Container */}
  <div className="overflow-hidden rounded-xl border border-gray-200/50 bg-white/50">
    {/* Table Header */}
    <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/50 text-sm font-semibold text-gray-700">
      <div className="col-span-1 text-center">#</div>
      <div className="col-span-5">Problem</div>
      <div className="col-span-3">Contest</div>
      <div className="col-span-2 text-center">Rating</div>
      <div className="col-span-1 text-center">Attempts</div>
    </div>
    
    {/* Table Body */}
    <div className="max-h-96 overflow-y-auto">
      {displayProblems.map((problem, index) => (
        <ProblemRow 
          key={problem.id} 
          problem={problem} 
          index={index} 
        />
      ))}
      
      {unsolved.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-check-circle text-green-400 text-3xl mb-2"></i>
          <p className="font-medium">All problems solved! 🎉</p>
          <p className="text-sm mt-1">Great job on solving everything!</p>
        </div>
      )}
    </div>
  </div>
</div>
  );
};

const ProblemRow = ({ problem, index }) => {
  const getRatingColor = (rating) => {
    if (!rating) return 'text-gray-500 bg-gray-100';
    const r = parseInt(rating);
    if (r < 1200) return 'text-gray-700 bg-gray-100';
    if (r < 1400) return 'text-green-700 bg-green-100';
    if (r < 1600) return 'text-cyan-700 bg-cyan-100';
    if (r < 1900) return 'text-blue-700 bg-blue-100';
    if (r < 2100) return 'text-purple-700 bg-purple-100';
    if (r < 2400) return 'text-orange-700 bg-orange-100';
    return 'text-red-700 bg-red-100';
  };

  const getProblemIcon = (problem) => {
    if (problem.rating >= 2400) return 'fa-fire text-red-500';
    if (problem.rating >= 2100) return 'fa-crown text-orange-500';
    if (problem.rating >= 1900) return 'fa-gem text-purple-500';
    if (problem.rating >= 1600) return 'fa-rocket text-blue-500';
    if (problem.rating >= 1400) return 'fa-feather text-cyan-500';
    if (problem.rating >= 1200) return 'fa-leaf text-green-500';
    return 'fa-puzzle-piece text-gray-500';
  };

  return (
    <a href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`} target='_blank' className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-100/50 hover:bg-blue-50/30 transition-all duration-200 group cursor-pointer">
      {/* Index */}
      <div className="col-span-1 flex items-center justify-center">
        <span className="text-sm font-medium text-gray-500 bg-gray-100/50 px-2 py-1 rounded-lg group-hover:bg-gray-200 transition-colors">
          {index + 1}
        </span>
      </div>
      
      {/* Problem Name */}
      <div className="col-span-5 flex items-center gap-3">
        <i className={`fas ${getProblemIcon(problem)} text-lg group-hover:scale-110 transition-transform`}></i>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
            {problem.name}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {problem.contestId} - {problem.index}
          </div>
        </div>
      </div>
      
      {/* Contest */}
      <div className="col-span-3 flex items-center">
        <span className="text-sm text-gray-600 truncate">
          {problem.contestName || `Contest ${problem.contestId}`}
        </span>
      </div>
      
      {/* Rating */}
      <div className="col-span-2 flex items-center justify-center">
        {problem.rating ? (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getRatingColor(problem.rating)}`}>
            {problem.rating}
          </span>
        ) : (
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            Unrated
          </span>
        )}
      </div>
      
      {/* Attempts */}
      <div className="col-span-1 flex items-center justify-center">
        <div className="flex items-center gap-1">
          <i className="fas fa-redo text-gray-400 text-xs"></i>
          <span className="text-sm font-medium text-gray-700">
            {problem.attempts || 1}
          </span>
        </div>
      </div>
    </a>
  );
};


const getUnsolvedProblems = (submissions) => {
  const problems = new Map();
  
  submissions.forEach(sub => {
    const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
    
    if (!problems.has(problemId)) {
      problems.set(problemId, {
        id: problemId,
        contestId: sub.problem.contestId,
        index: sub.problem.index,
        name: sub.problem.name,
        rating: sub.problem.rating,
        tags: sub.problem.tags,
        attempts: 0,
        solved: false
      });
    }
    
    const problem = problems.get(problemId);
    problem.attempts++;
    
    if (sub.verdict === 'OK') {
      problem.solved = true;
    }
  });

  return Array.from(problems.values())
    .filter(problem => !problem.solved)
    .sort((a, b) => b.attempts - a.attempts);
};

export default UnsolvedProblems;