import {useState, useEffect} from 'react'
import {ProgressPlugin} from 'webpack'
import type {Bud} from '@roots/bud'

const useProgress = (
  bud: Bud,
): {
  progressPlugin: ProgressPlugin
  percentage: number
  message: string
} => {
  const [progressPlugin, setProgressPlugin] = useState(null)
  const [percentage, setPercentage] = useState(0)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (!progressPlugin) {
      const newProgressPlugin = new ProgressPlugin({
        activeModules: true,
        modules: true,
        handler(percentage, message) {
          setPercentage(percentage)
          setMessage(message)
        },
      })

      setProgressPlugin(newProgressPlugin)

      bud.logger.info(
        {name: 'bud.compiler'},
        'progress plugin created.',
      )
    }
  }, [])

  return {progressPlugin, percentage, message}
}

export {useProgress}
