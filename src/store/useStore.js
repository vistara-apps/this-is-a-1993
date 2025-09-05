import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// User subscription tiers
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  STARTER: 'starter',
  PRO: 'pro',
  ELITE: 'elite'
}

// Subscription tier details
export const TIER_DETAILS = {
  [SUBSCRIPTION_TIERS.FREE]: {
    name: 'Free',
    price: 0,
    features: ['Basic courses', 'Limited simulations'],
    maxSimulations: 3,
    maxStrategies: 1
  },
  [SUBSCRIPTION_TIERS.STARTER]: {
    name: 'Starter',
    price: 9,
    features: ['All core courses', 'Unlimited simulations', 'Progress tracking'],
    maxSimulations: -1,
    maxStrategies: 3
  },
  [SUBSCRIPTION_TIERS.PRO]: {
    name: 'Pro',
    price: 29,
    features: ['Advanced strategies', 'Backtesting', 'Market analysis', 'Priority support'],
    maxSimulations: -1,
    maxStrategies: 10
  },
  [SUBSCRIPTION_TIERS.ELITE]: {
    name: 'Elite',
    price: 99,
    features: ['Personalized coaching', 'Live market analysis', 'Custom strategies', '1-on-1 sessions'],
    maxSimulations: -1,
    maxStrategies: -1
  }
}

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: {
        userId: 'user-1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        subscriptionTier: SUBSCRIPTION_TIERS.STARTER,
        subscriptionStatus: 'active',
        subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        joinedDate: new Date('2024-01-15'),
        avatar: null
      },

      // Progress state
      progress: {
        totalExp: 250,
        level: 3,
        completedCourses: ['course-1'],
        completedModules: ['module-1-1', 'module-1-2', 'module-1-3'],
        moduleProgress: {
          'course-1': {
            'module-1-1': 100,
            'module-1-2': 100,
            'module-1-3': 100
          },
          'course-2': {
            'module-2-1': 75
          }
        },
        achievements: ['first-course', 'first-trade', 'week-streak'],
        streak: 5,
        lastActivity: new Date(),
        quizScores: {
          'module-1-1': 85,
          'module-1-2': 92,
          'module-1-3': 78
        }
      },

      // Simulation state
      simulations: {
        activeSimulation: null,
        simulationHistory: [],
        portfolioValue: 10000,
        totalTrades: 0,
        winRate: 0,
        bestPerformance: 0
      },

      // Strategy state
      strategies: {
        userStrategies: [],
        backtestResults: {},
        favoriteStrategies: []
      },

      // UI state
      ui: {
        currentView: 'dashboard',
        selectedCourse: null,
        selectedModule: null,
        sidebarOpen: false,
        notifications: [],
        theme: 'dark'
      },

      // Actions
      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),

      updateProgress: (progressData) => set((state) => ({
        progress: { ...state.progress, ...progressData }
      })),

      completeModule: (courseId, moduleId, score = 0) => set((state) => {
        const newCompletedModules = [...state.progress.completedModules]
        if (!newCompletedModules.includes(moduleId)) {
          newCompletedModules.push(moduleId)
        }

        const newModuleProgress = {
          ...state.progress.moduleProgress,
          [courseId]: {
            ...state.progress.moduleProgress[courseId],
            [moduleId]: 100
          }
        }

        const newQuizScores = {
          ...state.progress.quizScores,
          [moduleId]: score
        }

        return {
          progress: {
            ...state.progress,
            completedModules: newCompletedModules,
            moduleProgress: newModuleProgress,
            quizScores: newQuizScores,
            totalExp: state.progress.totalExp + 50,
            lastActivity: new Date()
          }
        }
      }),

      completeCourse: (courseId) => set((state) => {
        const newCompletedCourses = [...state.progress.completedCourses]
        if (!newCompletedCourses.includes(courseId)) {
          newCompletedCourses.push(courseId)
        }

        return {
          progress: {
            ...state.progress,
            completedCourses: newCompletedCourses,
            totalExp: state.progress.totalExp + 100,
            lastActivity: new Date()
          }
        }
      }),

      addAchievement: (achievementId) => set((state) => {
        const newAchievements = [...state.progress.achievements]
        if (!newAchievements.includes(achievementId)) {
          newAchievements.push(achievementId)
        }

        return {
          progress: {
            ...state.progress,
            achievements: newAchievements,
            totalExp: state.progress.totalExp + 25
          }
        }
      }),

      updateSimulation: (simulationData) => set((state) => ({
        simulations: { ...state.simulations, ...simulationData }
      })),

      addStrategy: (strategy) => set((state) => ({
        strategies: {
          ...state.strategies,
          userStrategies: [...state.strategies.userStrategies, strategy]
        }
      })),

      updateStrategy: (strategyId, updates) => set((state) => ({
        strategies: {
          ...state.strategies,
          userStrategies: state.strategies.userStrategies.map(strategy =>
            strategy.strategyId === strategyId ? { ...strategy, ...updates } : strategy
          )
        }
      })),

      setCurrentView: (view) => set((state) => ({
        ui: { ...state.ui, currentView: view }
      })),

      setSelectedCourse: (course) => set((state) => ({
        ui: { ...state.ui, selectedCourse: course }
      })),

      setSelectedModule: (module) => set((state) => ({
        ui: { ...state.ui, selectedModule: module }
      })),

      addNotification: (notification) => set((state) => ({
        ui: {
          ...state.ui,
          notifications: [...state.ui.notifications, {
            id: Date.now(),
            timestamp: new Date(),
            ...notification
          }]
        }
      })),

      removeNotification: (notificationId) => set((state) => ({
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(n => n.id !== notificationId)
        }
      })),

      // Subscription management
      upgradeSubscription: (newTier) => set((state) => ({
        user: {
          ...state.user,
          subscriptionTier: newTier,
          subscriptionStatus: 'active',
          subscriptionExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        }
      })),

      // Helper functions
      canAccessFeature: (feature) => {
        const state = get()
        const tier = state.user.subscriptionTier
        const tierDetails = TIER_DETAILS[tier]
        
        switch (feature) {
          case 'advanced-courses':
            return tier !== SUBSCRIPTION_TIERS.FREE
          case 'unlimited-simulations':
            return tierDetails.maxSimulations === -1
          case 'backtesting':
            return tier === SUBSCRIPTION_TIERS.PRO || tier === SUBSCRIPTION_TIERS.ELITE
          case 'coaching':
            return tier === SUBSCRIPTION_TIERS.ELITE
          default:
            return true
        }
      },

      getSimulationsRemaining: () => {
        const state = get()
        const tier = state.user.subscriptionTier
        const tierDetails = TIER_DETAILS[tier]
        
        if (tierDetails.maxSimulations === -1) return -1
        return Math.max(0, tierDetails.maxSimulations - state.simulations.totalTrades)
      }
    }),
    {
      name: 'tradestart-store',
      partialize: (state) => ({
        user: state.user,
        progress: state.progress,
        simulations: state.simulations,
        strategies: state.strategies
      })
    }
  )
)

export default useStore
