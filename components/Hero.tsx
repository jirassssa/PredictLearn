'use client';

import { Sparkles, TrendingUp, Award, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden py-20 px-4 md:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 rounded-full border border-indigo-200 dark:border-indigo-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-heading font-semibold text-indigo-700 dark:text-indigo-300">
              AI-Powered Educational Platform
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-gray-900 dark:text-white leading-tight">
            Master Prediction Markets
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              With AI Intelligence
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learn to analyze signals, backtest strategies, and make data-driven predictions on Polymarket & Kalshi with our comprehensive educational platform
          </p>

          {/* CTA Buttons with Urgency */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-sm text-indigo-700 dark:text-indigo-300 font-semibold bg-indigo-50 dark:bg-indigo-950/50 px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-4 h-4" />
              <span>Limited Time: Join Today & Get Free Premium Access for 30 Days</span>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => router.push('/')}
                aria-label="Start learning for free"
                className="group relative inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-heading font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-indigo-300 focus:outline-none cursor-pointer"
              >
                <span>Start Learning Free</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Stats with Tooltips */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-12 max-w-4xl mx-auto">
            {[
              { value: '10K+', label: 'Active Learners', tooltip: 'Growing community of traders and analysts', icon: TrendingUp },
              { value: '73%', label: 'Avg Win Rate', tooltip: 'Based on backtested strategies (6-month avg)', icon: Award },
              { value: '50+', label: 'Market Signals', tooltip: 'Real-time signals from multiple sources', icon: Zap },
              { value: '24/7', label: 'AI Analysis', tooltip: 'Continuous monitoring and predictions', icon: Sparkles },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="space-y-2 group relative cursor-help p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                  <Icon className="w-6 h-6 mx-auto text-indigo-500 mb-2" />
                  <div className="text-3xl md:text-4xl font-heading font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{stat.label}</div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-xl">
                    <div className="relative z-10">{stat.tooltip}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
