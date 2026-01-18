# PredictLearn

> Master prediction markets with real Polymarket data and AI-powered insights

## 🎯 Features

- **📊 Real-time Market Data** - Live data from 100+ Polymarket markets
- **📡 Signal Tracker** - Track performance of prediction signals (Volume, Twitter, Whales, News)
- **🔬 Backtesting Playground** - Test strategies on historical data
- **🎯 Explainable Predictions** - AI-powered predictions with explanations
- **🎮 Pattern Training** - Interactive learning modules
- **👥 Community Insights** - Share and learn from other traders

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jirassssa/PredictLearn.git
cd PredictLearn

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🏗️ Tech Stack

- **Framework**: Next.js 14.2.18 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Charts**: Recharts 2.12
- **Icons**: Lucide React
- **API**: Polymarket CLOB & Gamma API

## 📁 Project Structure

```
PredictLearn/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (CORS proxy)
│   │   └── polymarket/    # Polymarket API endpoints
│   ├── landing/           # Landing page
│   └── page.tsx           # Main dashboard
├── components/            # React components
│   ├── Dashboard.tsx      # User progress & overview
│   ├── SignalTracker.tsx  # Signal performance tracker
│   ├── BacktestingPlayground.tsx
│   ├── ExplainablePredictions.tsx
│   ├── PatternTraining.tsx
│   └── CommunityInsights.tsx
├── lib/                   # Utility functions
│   ├── polymarket.ts      # Polymarket API client
│   ├── signalCalculator.ts # Signal metrics calculator
│   └── mockData.ts        # Mock data for development
├── hooks/                 # React hooks
│   └── usePolymarket.ts   # Data fetching hooks
└── types/                 # TypeScript types
    └── index.ts

```

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env.local` file for optional configurations:

```bash
# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_ga_id

# Monitoring (optional)
SENTRY_DSN=your_sentry_dsn
```

**Note**: The app works without environment variables. It uses public Polymarket APIs.

## 📊 How It Works

### Signal Calculation

PredictLearn derives signals from real Polymarket data:

- **Volume Signal**: Markets with >$10k volume
- **Twitter/News Signal**: Price volatility (0.3-0.7 range) as proxy for social buzz
- **Whales Signal**: Markets with >$5k liquidity indicating institutional interest
- **News Signal**: Combination of volume and liquidity changes

### API Integration

The app uses Next.js API routes as a CORS proxy to fetch data from:
- Polymarket CLOB API: `https://clob.polymarket.com`
- Polymarket Gamma API: `https://gamma-api.polymarket.com`

Data is cached for 30 seconds and auto-refreshes every 60 seconds.

## 🎨 UI Components

- **Dashboard Tab**: User progress, XP, streaks, badges
- **Signal Tracker**: Real-time signal performance with educational tooltips
- **Backtesting**: Test strategies on historical markets
- **Predictions**: AI-powered outcome predictions
- **Training**: Interactive learning modules
- **Community**: Share insights and strategies

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Other Platforms

- Netlify
- Railway
- DigitalOcean App Platform

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Disclaimer

This is an educational platform. Not financial advice. Use at your own risk.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [Polymarket API Docs](https://docs.polymarket.com)
- **Issues**: [GitHub Issues](https://github.com/jirassssa/PredictLearn/issues)

## 💡 Credits

Built with real-time data from [Polymarket](https://polymarket.com)

---

**Learn to predict with confidence. Start your journey today! 🚀**
