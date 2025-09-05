import React, { useState } from 'react'
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Quiz = ({ quiz, onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = quiz.questions
  const currentQ = questions[currentQuestion]

  const handleAnswerSelect = (answerIndex) => {
    if (showExplanation) return

    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }))
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setShowExplanation(false)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    const correctAnswers = questions.reduce((count, question, index) => {
      return count + (selectedAnswers[index] === question.correct ? 1 : 0)
    }, 0)

    const score = Math.round((correctAnswers / questions.length) * 100)
    setShowResults(true)
    onComplete(score)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setShowExplanation(false)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent work! 🎉'
    if (score >= 60) return 'Good job! Keep learning! 👍'
    return 'Keep practicing! You\'ll get there! 💪'
  }

  if (showResults) {
    const correctAnswers = questions.reduce((count, question, index) => {
      return count + (selectedAnswers[index] === question.correct ? 1 : 0)
    }, 0)
    const score = Math.round((correctAnswers / questions.length) * 100)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      >
        <div className="bg-dark-surface rounded-xl p-8 max-w-md w-full border border-dark-border">
          <div className="text-center">
            <div className="mb-6">
              <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
                {score}%
              </div>
              <h3 className="text-xl font-semibold text-dark-foreground mb-2">
                Quiz Complete!
              </h3>
              <p className="text-gray-400">
                {getScoreMessage(score)}
              </p>
            </div>

            <div className="bg-dark-background rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Correct Answers:</span>
                <span className="text-dark-foreground font-medium">
                  {correctAnswers}/{questions.length}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetQuiz}
                className="flex-1 btn-secondary flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retry
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn-primary"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-dark-surface rounded-xl p-6 max-w-2xl w-full border border-dark-border">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-dark-foreground">
              Knowledge Check
            </h3>
            <p className="text-gray-400 text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-dark-foreground"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="bg-dark-background rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h4 className="text-lg font-medium text-dark-foreground mb-4">
            {currentQ.question}
          </h4>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index
              const isCorrect = index === currentQ.correct
              const showCorrectness = showExplanation

              let buttonClass = 'w-full p-4 text-left rounded-lg border transition-all duration-200 '
              
              if (showCorrectness) {
                if (isCorrect) {
                  buttonClass += 'border-green-500 bg-green-500/10 text-green-400'
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'border-red-500 bg-red-500/10 text-red-400'
                } else {
                  buttonClass += 'border-dark-border bg-dark-background text-gray-400'
                }
              } else {
                if (isSelected) {
                  buttonClass += 'border-primary bg-primary/10 text-primary'
                } else {
                  buttonClass += 'border-dark-border bg-dark-background text-dark-foreground hover:border-primary/50'
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showExplanation}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showCorrectness && (
                      <div>
                        {isCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="bg-dark-background rounded-lg p-4 border border-dark-border">
                <h5 className="font-medium text-dark-foreground mb-2">Explanation:</h5>
                <p className="text-gray-400 text-sm">{currentQ.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-dark-foreground"
          >
            Skip Quiz
          </button>
          
          {showExplanation && (
            <button
              onClick={handleNext}
              className="btn-primary flex items-center gap-2"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Quiz
