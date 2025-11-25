import React, { useState } from 'react';
import UserStats from './components/UserStats';
import ContestStats from './components/ContestStats';
import UnsolvedProblems from './components/UnsolvedProblems';
import HeatMap from './components/HeatMap';
import VerdictChart from './components/VerdictChart';
import LanguageChart from './components/LanguageChart';
import TagChart from './components/TagChart';
import RatingChart from './components/RatingChart';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    if (!username) return;

    setLoading(true);
    try {
      // Fetch user info
      const userResponse = await fetch(`https://codeforces.com/api/user.info?handles=${username}`);
      const userData = await userResponse.json();

      // Fetch user submissions
      const submissionsResponse = await fetch(`https://codeforces.com/api/user.status?handle=${username}`);
      const submissionsData = await submissionsResponse.json();

      // Fetch user contests
      const contestsResponse = await fetch(`https://codeforces.com/api/user.rating?handle=${username}`);
      const contestsData = await contestsResponse.json();

      setUserData({
        userInfo: userData.result[0],
        submissions: submissionsData.result,
        contests: contestsData.result
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching user data. Please check the username and try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-xl relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-black/10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center mb-2">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
              <i className="fas fa-chart-line text-white text-2xl"></i>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Codeforces Insight
              </h1>
            </div>
            <p className="text-blue-100/80 mt-3 text-sm font-medium">
              <i className="fas fa-analytics mr-1"></i>
              Analyze and visualize your coding journey
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-xl mx-auto mt-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex gap-2 bg-white/95 backdrop-blur-sm rounded-xl p-1.5 shadow-2xl border border-white/20">
                <div className="flex-1 relative">
                  <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Codeforces handle..."
                    className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500 font-medium"
                    onKeyPress={(e) => e.key === 'Enter' && fetchUserData()}
                  />
                </div>
                <button
                  onClick={fetchUserData}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin text-white"></i>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-rocket text-white"></i>
                      <span>Analyze</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {userData ? (
          <div className="space-y-8">
            {/* Enhanced User Info Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-6">
                  {userData.userInfo.titlePhoto && (
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-30"></div>
                      <img
                        src={userData.userInfo.titlePhoto}
                        alt="Avatar"
                        className="relative w-20 h-20 rounded-full border-4 border-white shadow-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-3xl font-bold text-gray-800">
                        <i className="fas fa-user mr-2 text-purple-500"></i>
                        {userData.userInfo.handle}
                      </h2>
                      {userData.userInfo.rank && (
                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${userData.userInfo.rank.includes('legendary') ? 'bg-red-100 text-red-800 border border-red-200' :
                            userData.userInfo.rank.includes('master') ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                              userData.userInfo.rank.includes('candidate') ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                                userData.userInfo.rank.includes('expert') ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                  userData.userInfo.rank.includes('specialist') ? 'bg-cyan-100 text-cyan-800 border border-cyan-200' :
                                    userData.userInfo.rank.includes('pupil') ? 'bg-green-100 text-green-800 border border-green-200' :
                                      'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                          <i className="fas fa-trophy mr-1"></i>
                          {userData.userInfo.rank}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-6 mt-3 text-sm text-gray-600">
                      {userData.userInfo.rating && (
                        <div className="flex items-center gap-2">
                          <i className="fas fa-chart-line text-green-500 text-xs"></i>
                          <span className="font-medium">Current: {userData.userInfo.rating}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <i className="fas fa-crown text-purple-500 text-xs"></i>
                        <span className="font-medium">Max: {userData.userInfo.maxRank} ({userData.userInfo.maxRating})</span>
                      </div>
                      {userData.userInfo.organization && (
                        <div className="flex items-center gap-2">
                          <i className="fas fa-building text-blue-500 text-xs"></i>
                          <span className="font-medium">{userData.userInfo.organization}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="grid gap-4">
                <div className="transform hover:scale-[1.02] transition-transform duration-300">
                  <UserStats submissions={userData.submissions} />
                </div>
                <LanguageChart submissions={userData.submissions} />
                <TagChart submissions={userData.submissions} />
                <RatingChart submissions={userData.submissions} />

              </div>
              <div className="grid gap-4">


                <div className="transform hover:scale-[1.02] transition-transform duration-300">
                  <ContestStats contests={userData.contests} />
                </div>
                <VerdictChart submissions={userData.submissions} />

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 transform hover:scale-[1.01] transition-all duration-300">
                  <UnsolvedProblems submissions={userData.submissions} />
                </div>
              </div>
            </div>
            {/* Enhanced Charts Grid */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 transform hover:scale-[1.01] transition-all duration-300">
              <HeatMap submissions={userData.submissions} />
            </div>

            {/* Enhanced Full-width Components */}


          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <i className="fas fa-chart-line text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                <i className="fas fa-search mr-2 text-blue-500"></i>
                Ready to Analyze
              </h3>
              <p className="text-gray-500">
                <i className="fas fa-terminal mr-1 text-purple-500"></i>
                Enter a Codeforces handle to visualize coding statistics and progress
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white/50 border-t border-gray-200/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <div className="flex items-center justify-center gap-4">
            <i className="fab fa-font-awesome text-blue-500"></i>
            <i className="fab fa-react text-blue-400"></i>
          </div>
          <p className="mt-2 text-sm">
            Powered by Codeforces API
          </p><p className="mt-2 text-sm">
            Developed by <a href="https://github.com/Prerit008">Prerit008</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;