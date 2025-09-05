import React from 'react'
import { Play, BookOpen, Target, TrendingUp, Award, ChevronRight } from 'lucide-react'
import CourseCard from './CourseCard'
import ProgressBar from './ProgressBar'
import { mockCourses } from '../data/mockData'

const Dashboard = ({ userProgress, onSelectCourse, onStartSimulation, onOpenStrategy }) => {
  const completedCourses = userProgress.completedCourses?.length || 0
  const totalCourses = mockCourses.length
  const overallProgress = (completedCourses / totalCourses) * 100

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark-foreground mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-gray-400 text-lg">
          Ready to continue your trading journey? Let's build your confidence step by step.
        </p>
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
            <div className="text-2xl font-bold text-dark-foreground">{userProgress.totalExp}</div>
            <div className="text-sm text-gray-400">Level {Math.floor(userProgress.totalExp / 100) + 1}</div>
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
          {mockCourses.map((course) => (
            <CourseCard 
              key={course.courseId}
              course={course}
              isCompleted={userProgress.completedCourses?.includes(course.courseId)}
              onSelect={() => onSelectCourse(course)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard