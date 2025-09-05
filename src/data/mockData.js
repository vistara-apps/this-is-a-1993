export const mockCourses = [
  {
    courseId: 'course-1',
    title: 'Trading Fundamentals',
    description: 'Learn the core concepts of trading, market mechanics, and basic analysis techniques that every trader should know.',
    duration: '45 min',
    enrolled: '2.1k',
    difficulty: 'Beginner',
    modules: [
      {
        moduleId: 'module-1-1',
        title: 'Market Basics & Structure',
        content: 'Understanding how markets work and basic terminology',
        duration: '15 min'
      },
      {
        moduleId: 'module-1-2',
        title: 'Order Types & Execution',
        content: 'Different types of orders and how they work',
        duration: '15 min'
      },
      {
        moduleId: 'module-1-3',
        title: 'Reading Charts',
        content: 'Basic chart patterns and candlestick analysis',
        duration: '15 min'
      }
    ]
  },
  {
    courseId: 'course-2',
    title: 'Risk Management Essentials',
    description: 'Master the art of protecting your capital with proven risk management strategies and position sizing techniques.',
    duration: '60 min',
    enrolled: '1.8k',
    difficulty: 'Beginner',
    modules: [
      {
        moduleId: 'module-2-1',
        title: 'Position Sizing',
        content: 'How to determine the right position size for each trade',
        duration: '20 min'
      },
      {
        moduleId: 'module-2-2',
        title: 'Stop Losses & Take Profits',
        content: 'Setting and managing stop losses and profit targets',
        duration: '20 min'
      },
      {
        moduleId: 'module-2-3',
        title: 'Portfolio Risk',
        content: 'Managing overall portfolio risk and correlation',
        duration: '20 min'
      }
    ]
  },
  {
    courseId: 'course-3',
    title: 'Technical Analysis Deep Dive',
    description: 'Advanced chart analysis, indicators, and pattern recognition to improve your trading decision-making process.',
    duration: '90 min',
    enrolled: '1.5k',
    difficulty: 'Intermediate',
    modules: [
      {
        moduleId: 'module-3-1',
        title: 'Advanced Chart Patterns',
        content: 'Complex patterns and their trading implications',
        duration: '30 min'
      },
      {
        moduleId: 'module-3-2',
        title: 'Technical Indicators',
        content: 'RSI, MACD, Bollinger Bands and more',
        duration: '30 min'
      },
      {
        moduleId: 'module-3-3',
        title: 'Volume Analysis',
        content: 'Understanding volume and its significance',
        duration: '30 min'
      }
    ]
  },
  {
    courseId: 'course-4',
    title: 'Strategy Development',
    description: 'Learn to create, test, and optimize your own trading strategies using systematic approaches and backtesting.',
    duration: '75 min',
    enrolled: '1.2k',
    difficulty: 'Advanced',
    modules: [
      {
        moduleId: 'module-4-1',
        title: 'Strategy Framework',
        content: 'Building a systematic approach to trading',
        duration: '25 min'
      },
      {
        moduleId: 'module-4-2',
        title: 'Backtesting Methods',
        content: 'How to test strategies against historical data',
        duration: '25 min'
      },
      {
        moduleId: 'module-4-3',
        title: 'Strategy Optimization',
        content: 'Improving and refining your strategies',
        duration: '25 min'
      }
    ]
  },
  {
    courseId: 'course-5',
    title: 'Psychology of Trading',
    description: 'Understand the mental aspects of trading and develop the discipline needed for consistent success.',
    duration: '50 min',
    enrolled: '1.9k',
    difficulty: 'Intermediate',
    modules: [
      {
        moduleId: 'module-5-1',
        title: 'Emotional Control',
        content: 'Managing fear, greed, and other emotions',
        duration: '15 min'
      },
      {
        moduleId: 'module-5-2',
        title: 'Trading Discipline',
        content: 'Sticking to your plan and rules',
        duration: '15 min'
      },
      {
        moduleId: 'module-5-3',
        title: 'Common Mistakes',
        content: 'Avoiding the pitfalls that trap new traders',
        duration: '20 min'
      }
    ]
  },
  {
    courseId: 'course-6',
    title: 'Advanced Market Analysis',
    description: 'Dive deep into fundamental analysis, market sentiment, and advanced trading concepts for experienced traders.',
    duration: '120 min',
    enrolled: '950',
    difficulty: 'Advanced',
    modules: [
      {
        moduleId: 'module-6-1',
        title: 'Fundamental Analysis',
        content: 'Economic indicators and company analysis',
        duration: '40 min'
      },
      {
        moduleId: 'module-6-2',
        title: 'Market Sentiment',
        content: 'Understanding market psychology and sentiment indicators',
        duration: '40 min'
      },
      {
        moduleId: 'module-6-3',
        title: 'Advanced Strategies',
        content: 'Complex trading strategies and portfolio management',
        duration: '40 min'
      }
    ]
  }
]

export const mockMarketData = [
  { symbol: 'AAPL', price: 175.25, change: 2.15, changePercent: 1.24 },
  { symbol: 'TSLA', price: 245.80, change: -5.40, changePercent: -2.15 },
  { symbol: 'MSFT', price: 378.50, change: 1.80, changePercent: 0.48 },
  { symbol: 'GOOGL', price: 142.30, change: 0.75, changePercent: 0.53 },
  { symbol: 'AMZN', price: 155.90, change: -2.20, changePercent: -1.39 }
]

export const mockStrategies = [
  {
    strategyId: 'strategy-1',
    name: 'Momentum Breakout',
    description: 'Buy when price breaks above resistance with volume',
    performance: { return: 15.7, winRate: 68.3, maxDrawdown: -8.2 }
  },
  {
    strategyId: 'strategy-2',
    name: 'Mean Reversion',
    description: 'Buy oversold conditions, sell overbought',
    performance: { return: 12.4, winRate: 72.1, maxDrawdown: -6.5 }
  },
  {
    strategyId: 'strategy-3',
    name: 'Trend Following',
    description: 'Follow the trend with moving average signals',
    performance: { return: 18.9, winRate: 58.7, maxDrawdown: -12.1 }
  }
]