import React, { useState, useEffect } from 'react'
import { ArrowLeft, Play, Pause, RotateCcw, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Simulation = ({ onBack }) => {
  const [isRunning, setIsRunning] = useState(false)
  const [portfolio, setPortfolio] = useState({
    cash: 10000,
    positions: {},
    totalValue: 10000,
    pnl: 0
  })
  const [currentPrice, setCurrentPrice] = useState(150)
  const [priceHistory, setPriceHistory] = useState([])
  const [orderForm, setOrderForm] = useState({
    type: 'buy',
    quantity: 10,
    orderType: 'market'
  })

  // Simulate price movement
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 2
        const newPrice = Math.max(prev + change, 1)
        
        setPriceHistory(history => {
          const newHistory = [...history, { 
            time: Date.now(), 
            price: newPrice,
            timestamp: new Date().toLocaleTimeString()
          }]
          return newHistory.slice(-50) // Keep last 50 points
        })
        
        return newPrice
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const executeOrder = () => {
    if (orderForm.type === 'buy') {
      const cost = currentPrice * orderForm.quantity
      if (portfolio.cash >= cost) {
        setPortfolio(prev => ({
          ...prev,
          cash: prev.cash - cost,
          positions: {
            ...prev.positions,
            TSLA: (prev.positions.TSLA || 0) + orderForm.quantity
          }
        }))
      }
    } else {
      const shares = portfolio.positions.TSLA || 0
      if (shares >= orderForm.quantity) {
        const revenue = currentPrice * orderForm.quantity
        setPortfolio(prev => ({
          ...prev,
          cash: prev.cash + revenue,
          positions: {
            ...prev.positions,
            TSLA: Math.max(0, (prev.positions.TSLA || 0) - orderForm.quantity)
          }
        }))
      }
    }
  }

  const resetSimulation = () => {
    setPortfolio({
      cash: 10000,
      positions: {},
      totalValue: 10000,
      pnl: 0
    })
    setPriceHistory([])
    setCurrentPrice(150)
    setIsRunning(false)
  }

  const totalShares = portfolio.positions.TSLA || 0
  const stockValue = totalShares * currentPrice
  const totalPortfolioValue = portfolio.cash + stockValue
  const totalPnL = totalPortfolioValue - 10000

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
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
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isRunning ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pause' : 'Start'} Simulation</span>
          </button>
          
          <button
            onClick={resetSimulation}
            className="flex items-center space-x-2 btn-secondary"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Total Portfolio Value</h3>
          <div className="text-2xl font-bold text-dark-foreground">
            ${totalPortfolioValue.toFixed(2)}
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Cash Available</h3>
          <div className="text-2xl font-bold text-dark-foreground">
            ${portfolio.cash.toFixed(2)}
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Stock Holdings</h3>
          <div className="text-2xl font-bold text-dark-foreground">
            {totalShares} shares
          </div>
          <div className="text-sm text-gray-400">
            ${stockValue.toFixed(2)} value
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-gray-400 mb-2">P&L</h3>
          <div className={`text-2xl font-bold flex items-center space-x-1 ${
            totalPnL >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {totalPnL >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
            <span>${totalPnL.toFixed(2)}</span>
          </div>
          <div className="text-sm text-gray-400">
            {((totalPnL / 10000) * 100).toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-dark-foreground">TSLA - Tesla Inc.</h2>
              <div className="text-right">
                <div className="text-2xl font-bold text-dark-foreground">
                  ${currentPrice.toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">Real-time simulation</div>
              </div>
            </div>
            
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="timestamp" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    domain={['dataMin - 5', 'dataMax + 5']}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Trading Panel */}
        <div className="space-y-6">
          {/* Order Form */}
          <div className="card">
            <h3 className="text-lg font-bold text-dark-foreground mb-4">Place Order</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOrderForm(prev => ({ ...prev, type: 'buy' }))}
                  className={`py-2 px-4 rounded-lg font-medium transition-all ${
                    orderForm.type === 'buy'
                      ? 'bg-green-500 text-white'
                      : 'bg-dark-background text-gray-400 hover:text-dark-foreground'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setOrderForm(prev => ({ ...prev, type: 'sell' }))}
                  className={`py-2 px-4 rounded-lg font-medium transition-all ${
                    orderForm.type === 'sell'
                      ? 'bg-red-500 text-white'
                      : 'bg-dark-background text-gray-400 hover:text-dark-foreground'
                  }`}
                >
                  Sell
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  value={orderForm.quantity}
                  onChange={(e) => setOrderForm(prev => ({ 
                    ...prev, 
                    quantity: parseInt(e.target.value) || 0 
                  }))}
                  className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-lg text-dark-foreground focus:outline-none focus:border-primary"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Order Type
                </label>
                <select
                  value={orderForm.orderType}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, orderType: e.target.value }))}
                  className="w-full px-3 py-2 bg-dark-background border border-dark-border rounded-lg text-dark-foreground focus:outline-none focus:border-primary"
                >
                  <option value="market">Market Order</option>
                  <option value="limit">Limit Order</option>
                </select>
              </div>

              <div className="p-3 bg-dark-background rounded-lg">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Estimated Cost:</span>
                  <span className="text-dark-foreground">
                    ${(currentPrice * orderForm.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Available:</span>
                  <span className="text-dark-foreground">
                    {orderForm.type === 'buy' 
                      ? `$${portfolio.cash.toFixed(2)}`
                      : `${totalShares} shares`
                    }
                  </span>
                </div>
              </div>

              <button
                onClick={executeOrder}
                disabled={!isRunning}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Execute {orderForm.type === 'buy' ? 'Buy' : 'Sell'} Order
              </button>
            </div>
          </div>

          {/* Market Info */}
          <div className="card">
            <h3 className="text-lg font-bold text-dark-foreground mb-4">Market Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Market Status:</span>
                <span className={`font-medium ${isRunning ? 'text-green-500' : 'text-red-500'}`}>
                  {isRunning ? 'Open' : 'Closed'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Bid/Ask Spread:</span>
                <span className="text-dark-foreground">$0.02</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Volume:</span>
                <span className="text-dark-foreground">2.5M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Day Range:</span>
                <span className="text-dark-foreground">$145.20 - $152.80</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Simulation