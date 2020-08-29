import {useState, useEffect} from 'react'
import {ProgressPlugin} from 'webpack'
import type {Bud} from '@roots/bud'

const useProgress = (
  bud: Bud,
): {
  progress: ProgressPlugin
  percentage: number
  message: string
} => {
  const [progress, setProgress] = useState(null)
  const [percentage, setPercentage] = useState(0)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (!progress) {
      const newProgressPlugin = new ProgressPlugin({
        activeModules: true,
        modules: true,
        handler(percentage, message) {
          setPercentage(percentage)
          setMessage(message)
        },
      })

      setProgress(newProgressPlugin)
    }
  }, [])

  return {progress, percentage, message}
}

export {useProgress}
