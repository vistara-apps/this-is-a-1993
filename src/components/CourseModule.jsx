import React, { useState } from 'react'
import { ArrowLeft, Play, CheckCircle, BookOpen, Award, Brain } from 'lucide-react'
import Quiz from './Quiz'
import useStore from '../store/useStore'

const CourseModule = ({ course, onBack }) => {
  const [currentModule, setCurrentModule] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  
  const progress = useStore(state => state.progress)
  const completeModule = useStore(state => state.completeModule)
  const completeCourse = useStore(state => state.completeCourse)
  
  const handleCompleteModule = (moduleIndex, quizScore = 0) => {
    const module = course.modules[moduleIndex]
    completeModule(course.courseId, module.moduleId, quizScore)
    
    // Check if all modules are completed
    const completedModules = course.modules.filter(m => 
      progress.completedModules.includes(m.moduleId)
    ).length + 1 // +1 for the current module being completed
    
    if (completedModules === course.modules.length) {
      completeCourse(course.courseId)
    }
  }

  const handleQuizComplete = (score) => {
    handleCompleteModule(currentModule, score)
    setShowQuiz(false)
    
    // Move to next module or back to dashboard
    if (currentModule < course.modules.length - 1) {
      setCurrentModule(prev => prev + 1)
    } else {
      onBack()
    }
  }

  const module = course.modules[currentModule]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-dark-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Course Header */}
      <div className="card mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-dark-foreground mb-2">{course.title}</h1>
            <p className="text-gray-400">{course.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400 mb-1">Progress</div>
            <div className="text-lg font-semibold text-dark-foreground">
              {course.modules.filter(m => progress.completedModules.includes(m.moduleId)).length}/{course.modules.length}
            </div>
          </div>
        </div>
        
        <div className="w-full bg-dark-background rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(course.modules.filter(m => progress.completedModules.includes(m.moduleId)).length / course.modules.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Module Navigation */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="font-semibold text-dark-foreground mb-4">Course Modules</h3>
            <div className="space-y-2">
              {course.modules.map((mod, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentModule(index)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    currentModule === index
                      ? 'bg-primary text-white'
                      : 'bg-dark-background hover:bg-dark-background/70 text-gray-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {progress.completedModules.includes(mod.moduleId) ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        currentModule === index ? 'border-white' : 'border-gray-600'
                      }`} />
                    )}
                    <span className="text-sm font-medium">{mod.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-dark-foreground">{module.title}</h2>
              {progress.completedModules.includes(module.moduleId) && (
                <div className="flex items-center space-x-2 text-green-500">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
            </div>

            {/* Module Content */}
            <div className="prose prose-invert max-w-none mb-8">
              <div className="bg-dark-background p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-dark-foreground mb-4">Learning Objectives</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• Understand core market mechanics and price movement</li>
                  <li>• Learn different order types and when to use them</li>
                  <li>• Practice reading basic chart patterns</li>
                  <li>• Implement risk management principles</li>
                </ul>
              </div>

              <div className="space-y-4 text-gray-300">
                <p>
                  Welcome to the foundation of trading knowledge. In this module, you'll learn the 
                  essential concepts that every successful trader must understand before placing their first trade.
                </p>
                
                <h4 className="text-lg font-semibold text-dark-foreground">Market Basics</h4>
                <p>
                  The financial markets are essentially a giant auction where buyers and sellers meet 
                  to exchange assets. Understanding this fundamental concept is crucial for making 
                  informed trading decisions.
                </p>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <BookOpen className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-primary mb-1">Key Concept</h5>
                      <p className="text-sm text-gray-300">
                        Price is determined by supply and demand. When more people want to buy than sell, 
                        prices go up. When more people want to sell than buy, prices go down.
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-dark-foreground">Order Types</h4>
                <p>Understanding different order types is essential for executing your trading strategy:</p>
                <ul className="space-y-2">
                  <li><strong>Market Order:</strong> Buys or sells immediately at the current market price</li>
                  <li><strong>Limit Order:</strong> Buys or sells only at a specific price or better</li>
                  <li><strong>Stop Order:</strong> Becomes a market order when a certain price is reached</li>
                </ul>
              </div>
            </div>

            {/* Interactive Quiz */}
            {module.quiz && (
              <div className="bg-dark-background p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-dark-foreground">Knowledge Check</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Brain className="w-4 h-4" />
                    <span>{module.quiz.questions.length} questions</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  Test your understanding of this module with a quick quiz.
                </p>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Brain className="w-4 h-4" />
                  Start Quiz
                </button>
              </div>
            )}

            {/* Module Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-dark-border">
              <div className="flex items-center space-x-4">
                <button
                  disabled={currentModule === 0}
                  onClick={() => setCurrentModule(currentModule - 1)}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  disabled={currentModule === course.modules.length - 1}
                  onClick={() => setCurrentModule(currentModule + 1)}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Module
                </button>
              </div>

              {!progress.completedModules.includes(module.moduleId) && (
                <div className="flex gap-3">
                  {module.quiz ? (
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="flex items-center space-x-2 btn-primary"
                    >
                      <Brain className="w-4 h-4" />
                      <span>Take Quiz to Complete</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCompleteModule(currentModule)}
                      className="flex items-center space-x-2 btn-primary"
                    >
                      <Award className="w-4 h-4" />
                      <span>Complete Module (+50 XP)</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Quiz Modal */}
      {showQuiz && module.quiz && (
        <Quiz
          quiz={module.quiz}
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  )
}

export default CourseModule
