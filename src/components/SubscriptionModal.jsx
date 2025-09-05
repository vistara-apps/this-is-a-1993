import React, { useState } from 'react'
import { Check, X, Crown, Zap, Star, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import useStore, { SUBSCRIPTION_TIERS, TIER_DETAILS } from '../store/useStore'

const SubscriptionModal = ({ isOpen, onClose, currentTier }) => {
  const [selectedTier, setSelectedTier] = useState(currentTier)
  const [isAnnual, setIsAnnual] = useState(false)
  const upgradeSubscription = useStore(state => state.upgradeSubscription)

  if (!isOpen) return null

  const handleUpgrade = () => {
    upgradeSubscription(selectedTier)
    onClose()
  }

  const getTierIcon = (tier) => {
    switch (tier) {
      case SUBSCRIPTION_TIERS.STARTER:
        return <Zap className="w-6 h-6" />
      case SUBSCRIPTION_TIERS.PRO:
        return <Star className="w-6 h-6" />
      case SUBSCRIPTION_TIERS.ELITE:
        return <Crown className="w-6 h-6" />
      default:
        return <Users className="w-6 h-6" />
    }
  }

  const getTierColor = (tier) => {
    switch (tier) {
      case SUBSCRIPTION_TIERS.STARTER:
        return 'border-blue-500 bg-blue-500/10'
      case SUBSCRIPTION_TIERS.PRO:
        return 'border-purple-500 bg-purple-500/10'
      case SUBSCRIPTION_TIERS.ELITE:
        return 'border-yellow-500 bg-yellow-500/10'
      default:
        return 'border-gray-500 bg-gray-500/10'
    }
  }

  const getPrice = (tier, annual = false) => {
    const monthlyPrice = TIER_DETAILS[tier].price
    if (annual && monthlyPrice > 0) {
      return Math.round(monthlyPrice * 12 * 0.8) // 20% discount for annual
    }
    return monthlyPrice
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-surface rounded-xl p-6 max-w-4xl w-full border border-dark-border max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-dark-foreground">Choose Your Plan</h2>
            <p className="text-gray-400">Unlock your trading potential with the right subscription</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-dark-foreground p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-dark-background rounded-lg p-1 flex">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                !isAnnual 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:text-dark-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative ${
                isAnnual 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:text-dark-foreground'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                20% OFF
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(TIER_DETAILS).map(([tier, details]) => {
            const isSelected = selectedTier === tier
            const isCurrent = currentTier === tier
            const price = getPrice(tier, isAnnual)
            
            return (
              <motion.div
                key={tier}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-xl p-6 border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? getTierColor(tier)
                    : 'border-dark-border bg-dark-background hover:border-primary/50'
                }`}
                onClick={() => setSelectedTier(tier)}
              >
                {tier === SUBSCRIPTION_TIERS.PRO && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {isCurrent && (
                  <div className="absolute -top-3 right-4">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Current
                    </span>
                  </div>
                )}

                <div className="text-center mb-4">
                  <div className="flex justify-center mb-3">
                    {getTierIcon(tier)}
                  </div>
                  <h3 className="text-lg font-semibold text-dark-foreground mb-2">
                    {details.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-dark-foreground">
                      ${price}
                    </span>
                    {price > 0 && (
                      <span className="text-gray-400 text-sm">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {isAnnual && price > 0 && (
                    <p className="text-green-500 text-sm">
                      Save ${Math.round(details.price * 12 * 0.2)}/year
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {details.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-dark-border">
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>Simulations: {details.maxSimulations === -1 ? 'Unlimited' : details.maxSimulations}</div>
                    <div>Strategies: {details.maxStrategies === -1 ? 'Unlimited' : details.maxStrategies}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-400 hover:text-dark-foreground"
          >
            Maybe Later
          </button>
          
          <div className="flex gap-3">
            {selectedTier !== currentTier && (
              <button
                onClick={handleUpgrade}
                className="btn-primary px-8 py-3"
              >
                {TIER_DETAILS[selectedTier].price === 0 ? 'Downgrade' : 'Upgrade'} to {TIER_DETAILS[selectedTier].name}
              </button>
            )}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mt-8 pt-8 border-t border-dark-border">
          <h3 className="text-lg font-semibold text-dark-foreground mb-4">Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-2 text-gray-400">Feature</th>
                  {Object.entries(TIER_DETAILS).map(([tier, details]) => (
                    <th key={tier} className="text-center py-2 text-gray-400">
                      {details.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-dark-border/50">
                  <td className="py-2">Basic Courses</td>
                  <td className="text-center py-2"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-dark-border/50">
                  <td className="py-2">Advanced Courses</td>
                  <td className="text-center py-2"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                  <td className="text-center py-2"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-dark-border/50">
                  <td className="py-2">Strategy Backtesting</td>
                  <td className="text-center py-2"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                  <td className="text-center py-2"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                  <td className="text-center py-2"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                  <td className="text-center py-2"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-2">Personal Coaching</td>
                  <td className="text-center py-2"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                  <td className="text-center py-2"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                  <td className="text-center py-2"><X className="w-4 h-4 text-red-500 mx-auto" /></td>
                  <td className="text-center py-2"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SubscriptionModal
