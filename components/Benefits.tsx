'use client';

import { Target, FlaskConical, Lightbulb, Gamepad2, ArrowRight } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: Target,
      title: 'Signal Impact Tracker',
      description: 'Track Twitter, Whales, News signals with win rates & category breakdowns',
      color: 'from-blue-500 to-cyan-500',
      featured: true,
      large: true,
    },
    {
      icon: FlaskConical,
      title: 'Backtesting Playground',
      description: 'Test strategies with historical data and export detailed results',
      color: 'from-purple-500 to-pink-500',
      featured: true,
      large: false,
    },
    {
      icon: Lightbulb,
      title: 'Explainable AI',
      description: 'Transparent predictions with signal breakdowns & confidence levels',
      color: 'from-indigo-500 to-purple-500',
      featured: true,
      large: false,
    },
    {
      icon: Gamepad2,
      title: 'Gamified Learning',
      description: 'Daily challenges, XP, leaderboards, and achievement badges',
      color: 'from-orange-500 to-red-500',
      featured: true,
      large: true,
    },
  ];

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white">
            Everything You Need to
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Become a Prediction Expert
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful tools and features designed to accelerate your learning
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl cursor-pointer ${
                  benefit.large ? 'md:col-span-2 lg:col-span-2' : 'md:col-span-1'
                }`}
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}></div>

                {/* Icon */}
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.color} mb-6 shadow-xl transition-all duration-300 group-hover:scale-105`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {benefit.description}
                  </p>

                  {/* Learn More Link - Always Visible */}
                  <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold underline group-hover:gap-3 transition-all duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
