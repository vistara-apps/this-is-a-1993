import React from 'react'

const ProgressBar = ({ progress, variant = 'default' }) => {
  const getColorClass = () => {
    if (variant === 'success') return 'bg-green-500'
    if (variant === 'warning') return 'bg-yellow-500'
    if (variant === 'danger') return 'bg-red-500'
    return 'bg-primary'
  }

  return (
    <div className="w-full bg-dark-background rounded-full h-2">
      <div 
        className={`h-2 rounded-full transition-all duration-300 ${getColorClass()}`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  )
}

export default ProgressBar