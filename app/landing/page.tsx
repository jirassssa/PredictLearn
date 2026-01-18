'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import HowItWorks from '@/components/HowItWorks';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* How It Works */}
      <HowItWorks />

      {/* Benefits */}
      <Benefits />

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white">
              Trusted by Prediction Market Experts
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of learners improving their prediction skills
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Chen',
                role: 'Crypto Trader',
                image: 'A',
                quote: 'The signal tracker helped me increase my win rate from 55% to 73% in just 3 months!',
                rating: 5,
              },
              {
                name: 'Sarah Johnson',
                role: 'Political Analyst',
                image: 'S',
                quote: 'Best educational platform for learning prediction markets. The AI explanations are incredibly helpful.',
                rating: 5,
              },
              {
                name: 'Mike Rodriguez',
                role: 'Sports Bettor',
                image: 'M',
                quote: 'The backtesting feature saved me from making costly mistakes. Highly recommend!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 hover:shadow-2xl"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-heading font-bold text-lg">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Ready to Master Prediction Markets?
          </h2>
          <p className="text-xl text-indigo-100">
            Join 10,000+ learners who are already improving their prediction skills
          </p>
          <div className="flex justify-center pt-4">
            <button
              onClick={() => router.push('/')}
              aria-label="Start learning now"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-600 font-heading font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-white/50 focus:outline-none cursor-pointer"
            >
              <span>Start Learning Now</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
