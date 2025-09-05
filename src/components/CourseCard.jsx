import React from 'react'
import { Clock, Users, CheckCircle, Play } from 'lucide-react'

const CourseCard = ({ course, isCompleted, onSelect }) => {
  return (
    <div 
      className="card hover:shadow-lg transition-all duration-200 cursor-pointer group"
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isCompleted ? 'bg-green-500' : 'bg-primary'
        }`}>
          {isCompleted ? (
            <CheckCircle className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </div>
        {isCompleted && (
          <div className="px-2 py-1 bg-green-500/20 text-green-500 text-xs font-medium rounded">
            Completed
          </div>
        )}
      </div>

      <h3 className="font-semibold text-dark-foreground mb-2 group-hover:text-primary transition-colors">
        {course.title}
      </h3>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
        {course.description}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{course.duration || '45 min'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-3 h-3" />
          <span>{course.enrolled || '1.2k'}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-dark-border">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="text-dark-foreground">{isCompleted ? '100%' : '0%'}</span>
        </div>
        <div className="w-full bg-dark-background rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: isCompleted ? '100%' : '0%' }}
          />
        </div>
      </div>
    </div>
  )
}

export default CourseCard