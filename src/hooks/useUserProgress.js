import { useState } from 'react'

export const useUserProgress = () => {
  const [userProgress, setUserProgress] = useState({
    totalExp: 250,
    completedCourses: ['course-1'],
    currentCourse: null,
    moduleProgress: {},
    achievements: ['first-course', 'first-trade'],
    streak: 5
  })

  const updateProgress = (action, data) => {
    setUserProgress(prev => {
      switch (action) {
        case 'addExp':
          return { ...prev, totalExp: prev.totalExp + data }
          
        case 'completeCourse':
          return {
            ...prev,
            completedCourses: [...(prev.completedCourses || []), data],
            totalExp: prev.totalExp + 100 // Bonus XP for course completion
          }
          
        case 'updateModule':
          return {
            ...prev,
            moduleProgress: {
              ...prev.moduleProgress,
              [data.courseId]: {
                ...prev.moduleProgress[data.courseId],
                [data.moduleId]: data.progress
              }
            }
          }
          
        case 'addAchievement':
          return {
            ...prev,
            achievements: [...(prev.achievements || []), data]
          }
          
        default:
          return prev
      }
    })
  }

  return { userProgress, updateProgress }
}