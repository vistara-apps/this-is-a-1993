import React, { useState } from 'react'
import { ArrowLeft, Plus, Settings, TrendingUp, BarChart3, Target } from 'lucide-react'

const StrategyBuilder = ({ onBack }) => {
  const [strategy, setStrategy] = useState({
    name: 'My Trading Strategy',
    description: 'A momentum-based strategy for swing trading',
    rules: [
      { type: 'entry', condition: 'RSI < 30', action: 'Buy Signal' },
      { type: 'exit', condition: 'RSI > 70', action: 'Sell Signal' },
      { type: 'risk', condition: 'Stop Loss', action: '5% below entry' }
    ],
    backtestResults: {
      totalReturn: 15.7,
      winRate: 68.3,
      maxDrawdown: -8.2,
      sharpeRatio: 1.42,
      totalTrades: 24
    }
  })

  const [newRule, setNewRule] = useState({
    type: 'entry',
    condition: '',
    action: ''
  })

  const addRule = () => {
    if (newRule.condition && newRule.action) {
      setStrategy(prev => ({
        ...prev,
        rules: [...prev.rules, { ...newRule }]
      }))
      setNewRule({ type: 'entry', condition: '', action: '' })
    }
  }

  const removeRule = (index) => {
    setStrategy(prev => ({
      ...prev,
      rules: prev.rules.filter((_, i) => i !== index)
    }))
  }

  const runBacktest = () => {
    // Simulate backtest with random results
    const results = {
      totalReturn: (Math.random() * 30 - 5).toFixed(1),
      winRate: (50 + Math.random() * 30).toFixed(1),
      maxDrawdown: -(Math.random() * 15).toFixed(1),
      sharpeRatio: (0.5 + Math.random() * 2).toFixed(2),
      totalTrades: Math.floor(15 + Math.random() * 20)
    }
    
    setStrategy(prev => ({
      ...prev,
      backtestResults: results
    }))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-dark-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={runBacktest}
            className="btn-primary"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Run Backtest
          </button>
        </div>
      </div>

      {/* Strategy Header */}
      <div className="card mb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <input
              type="text"
              value={strategy.name}
              onChange={(e) => setStrategy(prev => ({ ...prev, name: e.target.value }))}
              className="text-2xl font-bold bg-transparent border-none text-dark-foreground focus:outline-none focus:ring-0 p-0 w-full"
            />
            <textarea
              value={strategy.description}
              onChange={(e) => setStrategy(prev => ({ ...prev, description: e.target.value }))}
              className="text-gray-400 bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-full mt-2 resize-none"
              rows="2"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-dark-foreground transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Strategy Rules */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold text-dark-foreground mb-4">Strategy Rules</h3>
            
            {/* Existing Rules */}
            <div className="space-y-3 mb-6">
              {strategy.rules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-dark-background rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      rule.type === 'entry' ? 'bg-green-500/20 text-green-500' :
                      rule.type === 'exit' ? 'bg-red-500/20 text-red-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {rule.type.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-dark-foreground">{rule.condition}</div>
                      <div className="text-sm text-gray-400">{rule.action}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeRule(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Rule */}
            <div className="border-t border-dark-border pt-4">
              <h4 className="font-medium text-dark-foreground mb-3">Add New Rule</h4>
              <div className="space-y-3">
                <select
                  value={newRule.type}
                  onChange={(e) => setNewRule(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-lg text-dark-foreground focus:outline-none focus:border-primary"
                >
                  <option value="entry">Entry Rule</option>
                  <option value="exit">Exit Rule</option>
                  <option value="risk">Risk Management</option>
                </select>
                
                <input
                  type="text"
                  placeholder="Condition (e.g., RSI < 30)"
                  value={newRule.condition}
                  onChange={(e) => setNewRule(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-lg text-dark-foreground focus:outline-none focus:border-primary"
                />
                
                <input
                  type="text"
                  placeholder="Action (e.g., Buy Signal)"
                  value={newRule.action}
                  onChange={(e) => setNewRule(prev => ({ ...prev, action: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-lg text-dark-foreground focus:outline-none focus:border-primary"
                />
                
                <button
                  onClick={addRule}
                  className="flex items-center space-x-2 btn-secondary"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Rule</span>
                </button>
              </div>
            </div>
          </div>

          {/* Strategy Parameters */}
          <div className="card">
            <h3 className="text-lg font-bold text-dark-foreground mb-4">Parameters</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Position Size (%)
                </label>
                <input
                  type="number"
                  defaultValue="2"
                  className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-lg text-dark-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Stop Loss (%)
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-lg text-dark-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Take Profit (%)
                </label>
                <input
                  type="number"
                  defaultValue="10"
                  className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-lg text-dark-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Max Positions
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-lg text-dark-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Backtest Results */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold text-dark-foreground mb-4">Backtest Results</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Return</span>
                <span className={`font-bold ${
                  strategy.backtestResults.totalReturn > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {strategy.backtestResults.totalReturn > 0 ? '+' : ''}{strategy.backtestResults.totalReturn}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Win Rate</span>
                <span className="font-bold text-dark-foreground">
                  {strategy.backtestResults.winRate}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Max Drawdown</span>
                <span className="font-bold text-red-500">
                  {strategy.backtestResults.maxDrawdown}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sharpe Ratio</span>
                <span className="font-bold text-dark-foreground">
                  {strategy.backtestResults.sharpeRatio}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Trades</span>
                <span className="font-bold text-dark-foreground">
                  {strategy.backtestResults.totalTrades}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dark-border">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs text-gray-400">Period</div>
                  <div className="font-medium text-dark-foreground">1Y</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Benchmark</div>
                  <div className="font-medium text-dark-foreground">+12.5%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Alpha</div>
                  <div className="font-medium text-green-500">+3.2%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-bold text-dark-foreground mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary">
                <Target className="w-4 h-4 mr-2" />
                Deploy Strategy
              </button>
              <button className="w-full btn-secondary">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Detailed Report
              </button>
              <button className="w-full btn-secondary">
                Save Strategy
              </button>
            </div>
          </div>

          {/* Strategy Templates */}
          <div className="card">
            <h3 className="text-lg font-bold text-dark-foreground mb-4">Templates</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-dark-background hover:bg-dark-background/70 rounded-lg transition-colors">
                <div className="font-medium text-dark-foreground">Moving Average Crossover</div>
                <div className="text-xs text-gray-400">Classic momentum strategy</div>
              </button>
              <button className="w-full text-left p-3 bg-dark-background hover:bg-dark-background/70 rounded-lg transition-colors">
                <div className="font-medium text-dark-foreground">Mean Reversion</div>
                <div className="text-xs text-gray-400">Buy low, sell high approach</div>
              </button>
              <button className="w-full text-left p-3 bg-dark-background hover:bg-dark-background/70 rounded-lg transition-colors">
                <div className="font-medium text-dark-foreground">Breakout Strategy</div>
                <div className="text-xs text-gray-400">Trade momentum breakouts</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StrategyBuilder