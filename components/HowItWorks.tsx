'use client';

import { BookOpen, Search, FlaskConical, Target, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HowItWorks() {
  const router = useRouter();
  const steps = [
    {
      number: '01',
      title: 'Learn the Basics',
      description: 'Start with our comprehensive dashboard to understand signal performance, win rates, and market trends',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '02',
      title: 'Analyze Signals',
      description: 'Deep dive into Twitter sentiment, whale activity, news impact, and volume patterns with our signal tracker',
      icon: Search,
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '03',
      title: 'Practice & Backtest',
      description: 'Test your strategies with historical data and see how they would have performed in real market conditions',
      icon: FlaskConical,
      color: 'from-indigo-500 to-purple-500',
    },
    {
      number: '04',
      title: 'Train with AI',
      description: 'Complete daily challenges, predict outcomes, and get instant feedback from our AI-powered system',
      icon: Target,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 rounded-full border border-indigo-200 dark:border-indigo-800">
            <span className="text-sm font-heading font-semibold text-indigo-700 dark:text-indigo-300">
              Simple 4-Step Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From beginner to expert in just 4 steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 -translate-y-1/2 hidden lg:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-2xl cursor-pointer">
                    {/* Step Number */}
                    <div className={`absolute -top-6 left-8 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl z-10 transition-all duration-300 group-hover:scale-105`}>
                      <span className="text-2xl font-heading font-bold text-white">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className="mt-8 mb-6">
                      <Icon className="w-16 h-16 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Progress Indicator */}
                    {index < steps.length - 1 && (
                      <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block">
                        <ArrowRight className="w-8 h-8 text-indigo-400" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => router.push('/')}
            aria-label="Get started with learning"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-heading font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-indigo-300 focus:outline-none cursor-pointer"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
