import React from 'react'
import { Play, BookOpen, Target, TrendingUp, Award, ChevronRight, Crown } from 'lucide-react'
import CourseCard from './CourseCard'
import ProgressBar from './ProgressBar'
import { mockCourses } from '../data/mockData'
import useStore, { SUBSCRIPTION_TIERS, TIER_DETAILS } from '../store/useStore'

const Dashboard = ({ onSelectCourse, onStartSimulation, onOpenStrategy, onShowSubscription }) => {
  const user = useStore(state => state.user)
  const progress = useStore(state => state.progress)
  const canAccessFeature = useStore(state => state.canAccessFeature)
  
  const completedCourses = progress.completedCourses?.length || 0
  const totalCourses = mockCourses.length
  const overallProgress = (completedCourses / totalCourses) * 100
  
  // Filter courses based on subscription tier
  const availableCourses = mockCourses.filter(course => {
    const tierOrder = [SUBSCRIPTION_TIERS.FREE, SUBSCRIPTION_TIERS.STARTER, SUBSCRIPTION_TIERS.PRO, SUBSCRIPTION_TIERS.ELITE]
    const userTierIndex = tierOrder.indexOf(user.subscriptionTier)
    const courseTierIndex = tierOrder.indexOf(course.requiredTier)
    return userTierIndex >= courseTierIndex
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-dark-foreground mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-gray-400 text-lg">
              Ready to continue your trading journey? Let's build your confidence step by step.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Current Plan</div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-dark-foreground">
                  {TIER_DETAILS[user.subscriptionTier].name}
                </span>
                {user.subscriptionTier !== SUBSCRIPTION_TIERS.FREE && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </div>
            </div>
            <button
              onClick={onShowSubscription}
              className="btn-primary text-sm px-4 py-2"
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-dark-foreground">Learning Progress</h3>
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Courses Completed</span>
              <span className="text-dark-foreground">{completedCourses}/{totalCourses}</span>
            </div>
            <ProgressBar progress={overallProgress} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-dark-foreground">Trading Score</h3>
            <Target className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-dark-foreground">85%</div>
            <div className="text-sm text-gray-400">+12% from last week</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-dark-foreground">Experience Points</h3>
            <Award className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-dark-foreground">{progress.totalExp}</div>
            <div className="text-sm text-gray-400">Level {Math.floor(progress.totalExp / 100) + 1}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <button 
          onClick={onStartSimulation}
          className="glass-card hover:bg-dark-surface/70 transition-all duration-200 group text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <Play className="w-6 h-6 text-primary" />
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
          </div>
          <h3 className="font-semibold text-dark-foreground mb-1">Start Trading Simulation</h3>
          <p className="text-sm text-gray-400">Practice with virtual $10,000</p>
        </button>

        <button 
          onClick={onOpenStrategy}
          className="glass-card hover:bg-dark-surface/70 transition-all duration-200 group text-left"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" />
          </div>
          <h3 className="font-semibold text-dark-foreground mb-1">Build Strategy</h3>
          <p className="text-sm text-gray-400">Create and backtest strategies</p>
        </button>

        <button className="glass-card hover:bg-dark-surface/70 transition-all duration-200 group text-left">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-6 h-6 text-yellow-500" />
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-yellow-500 transition-colors" />
          </div>
          <h3 className="font-semibold text-dark-foreground mb-1">Risk Assessment</h3>
          <p className="text-sm text-gray-400">Evaluate your risk profile</p>
        </button>
      </div>

      {/* Course Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dark-foreground">Learning Modules</h2>
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course) => (
            <CourseCard 
              key={course.courseId}
              course={course}
              isCompleted={progress.completedCourses?.includes(course.courseId)}
              onSelect={() => onSelectCourse(course)}
            />
          ))}
          
          {/* Locked courses for upgrade promotion */}
          {mockCourses.filter(course => !availableCourses.includes(course)).slice(0, 2).map((course) => (
            <div
              key={course.courseId}
              className="card relative overflow-hidden opacity-75"
            >
              <div className="absolute inset-0 bg-dark-background/80 flex items-center justify-center z-10">
                <div className="text-center">
                  <Crown className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-dark-foreground mb-1">
                    {TIER_DETAILS[course.requiredTier].name} Required
                  </p>
                  <button
                    onClick={onShowSubscription}
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
              <CourseCard 
                course={course}
                isCompleted={false}
                onSelect={() => {}}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
