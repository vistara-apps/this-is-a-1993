import React, { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import CourseModule from './components/CourseModule'
import Simulation from './components/Simulation'
import StrategyBuilder from './components/StrategyBuilder'
import SubscriptionModal from './components/SubscriptionModal'
import useStore from './store/useStore'

function App() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  
  // Store state
  const currentView = useStore(state => state.ui.currentView)
  const selectedCourse = useStore(state => state.ui.selectedCourse)
  const user = useStore(state => state.user)
  const progress = useStore(state => state.progress)
  
  // Store actions
  const setCurrentView = useStore(state => state.setCurrentView)
  const setSelectedCourse = useStore(state => state.setSelectedCourse)

  const renderCurrentView = () => {
    switch (currentView) {
      case 'course':
        return (
          <CourseModule 
            course={selectedCourse}
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
            onSelectCourse={(course) => {
              setSelectedCourse(course)
              setCurrentView('course')
            }}
            onStartSimulation={() => setCurrentView('simulation')}
            onOpenStrategy={() => setCurrentView('strategy')}
            onShowSubscription={() => setShowSubscriptionModal(true)}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-dark-background">
      <Header 
        currentView={currentView}
        onNavigate={setCurrentView}
        onShowSubscription={() => setShowSubscriptionModal(true)}
      />
      <main className="pt-16">
        {renderCurrentView()}
      </main>
      
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        currentTier={user.subscriptionTier}
      />
    </div>
  )
}

export default App
