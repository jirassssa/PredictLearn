'use client';

import { useState } from 'react';
import { mockChallenge, mockUserProgress } from '@/lib/mockData';

export default function PatternTraining() {
  const [userPrediction, setUserPrediction] = useState<'YES' | 'NO' | null>(null);
  const [confidence, setConfidence] = useState(50);
  const [submitted, setSubmitted] = useState(false);
  const challenge = mockChallenge;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const resetChallenge = () => {
    setUserPrediction(null);
    setConfidence(50);
    setSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🎮 Pattern Recognition Training
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sharpen your prediction skills with daily challenges
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-500">{mockUserProgress.streak}🔥</div>
            <div className="text-sm text-gray-500">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
          <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-semibold">
            +{challenge.xpReward} XP
          </span>
        </div>

        {/* Event Details */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {challenge.event.title}
          </h4>
          <div className="flex gap-2">
            <span className="bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full text-sm capitalize">
              {challenge.event.category}
            </span>
            <span className="bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full text-sm">
              Resolves: {new Date(challenge.event.resolveDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Available Signals */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Available Signals</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(challenge.signals).map(([signal, value]) => (
              <div
                key={signal}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {signal}
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{value}%</div>
                </div>
                <div className={`text-2xl ${value > 60 ? '📈' : value > 40 ? '➡️' : '📉'}`} />
              </div>
            ))}
          </div>
        </div>

        {!submitted ? (
          <>
            {/* Prediction Input */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Your Prediction
              </h4>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setUserPrediction('YES')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
                    userPrediction === 'YES'
                      ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">✅</div>
                  <div className="font-bold text-gray-900 dark:text-white">YES</div>
                </button>
                <button
                  onClick={() => setUserPrediction('NO')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
                    userPrediction === 'NO'
                      ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">❌</div>
                  <div className="font-bold text-gray-900 dark:text-white">NO</div>
                </button>
              </div>
            </div>

            {/* Confidence Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">Your Confidence</h4>
                <span className="text-2xl font-bold text-primary-600">{confidence}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Not Confident</span>
                <span>Very Confident</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!userPrediction}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                !userPrediction
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              Submit Prediction
            </button>
          </>
        ) : (
          <div className="space-y-4">
            {/* Result (Mock) */}
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-600 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">✅</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">Correct!</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Lakers won 112-108
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Prediction
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    {userPrediction} with {confidence}% confidence
                  </span>
                  <span className="text-green-600 font-semibold">
                    {confidence > 60 ? 'Strong call!' : 'Good prediction!'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <span className="mr-2">⭐</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    You spotted the value early - Twitter sentiment was the leading indicator
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2">💡</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    High volume signal (71%) was a strong confirmation
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <div>
                <div className="font-bold text-gray-900 dark:text-white">+{challenge.xpReward} XP Earned</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Streak: 🔥 8 days</div>
              </div>
              <button
                onClick={resetChallenge}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Next Challenge
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Preview */}
      <div className="card p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          🏆 Weekly Leaderboard
        </h3>
        <div className="space-y-3">
          {[
            { rank: 1, user: 'CryptoWhale', accuracy: 78, badge: '🥇' },
            { rank: 2, user: 'PoliticsGuru', accuracy: 72, badge: '🥈' },
            { rank: 3, user: 'You', accuracy: mockUserProgress.accuracy, badge: '🥉' },
          ].map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center justify-between p-3 rounded-lg ${
                entry.user === 'You'
                  ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-600'
                  : 'bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{entry.badge}</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{entry.user}</div>
                  <div className="text-sm text-gray-500">{entry.accuracy}% accuracy</div>
                </div>
              </div>
              <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
                #{entry.rank}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
