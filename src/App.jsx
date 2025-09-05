import React, { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import CourseModule from './components/CourseModule'
import Simulation from './components/Simulation'
import StrategyBuilder from './components/StrategyBuilder'
import { useUserProgress } from './hooks/useUserProgress'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { userProgress, updateProgress } = useUserProgress()

  const renderCurrentView = () => {
    switch (currentView) {
      case 'course':
        return (
          <CourseModule 
            course={selectedCourse}
            userProgress={userProgress}
            onProgress={updateProgress}
            onBack={() => setCurrentView('dashboard')}
          />
        )
      case 'simulation':
        return (
          <Simulation 
            onBack={() => setCurrentView('dashboard')}
          />
        )
      case 'strategy':
        return (
          <StrategyBuilder 
            onBack={() => setCurrentView('dashboard')}
          />
        )
      default:
        return (
          <Dashboard 
            userProgress={userProgress}
            onSelectCourse={(course) => {
              setSelectedCourse(course)
              setCurrentView('course')
            }}
            onStartSimulation={() => setCurrentView('simulation')}
            onOpenStrategy={() => setCurrentView('strategy')}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-dark-background">
      <Header 
        currentView={currentView}
        onNavigate={setCurrentView}
        userProgress={userProgress}
      />
      <main className="pt-16">
        {renderCurrentView()}
      </main>
    </div>
  )
}

export default App