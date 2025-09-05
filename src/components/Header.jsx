import React from 'react'
import { TrendingUp, User, Bell, Menu, Crown } from 'lucide-react'
import useStore, { TIER_DETAILS } from '../store/useStore'

const Header = ({ currentView, onNavigate, onShowSubscription }) => {
  const user = useStore(state => state.user)
  const progress = useStore(state => state.progress)
  return (
    <header className="fixed top-0 left-0 right-0 bg-dark-surface/80 backdrop-blur-sm border-b border-dark-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-dark-foreground">TradeStart</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('dashboard')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'dashboard' 
                  ? 'text-primary' 
                  : 'text-gray-400 hover:text-dark-foreground'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate('simulation')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'simulation' 
                  ? 'text-primary' 
                  : 'text-gray-400 hover:text-dark-foreground'
              }`}
            >
              Simulations
            </button>
            <button 
              onClick={() => onNavigate('strategy')}
              className={`text-sm font-medium transition-colors ${
                currentView === 'strategy' 
                  ? 'text-primary' 
                  : 'text-gray-400 hover:text-dark-foreground'
              }`}
            >
              Strategies
            </button>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onShowSubscription}
              className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-dark-background rounded-lg hover:bg-dark-background/70 transition-colors"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400">{TIER_DETAILS[user.subscriptionTier].name}</span>
              {user.subscriptionTier !== 'free' && <Crown className="w-3 h-3 text-yellow-500" />}
            </button>
            
            <button className="relative p-2 text-gray-400 hover:text-dark-foreground transition-colors">
              <Bell className="w-5 h-5" />
              {progress.achievements.length > 3 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </button>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-dark-foreground">{user.name}</div>
                <div className="text-xs text-gray-400">
                  Level {Math.floor(progress.totalExp / 100) + 1} • {progress.totalExp} XP
                </div>
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>

            <button className="md:hidden p-2 text-gray-400">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
