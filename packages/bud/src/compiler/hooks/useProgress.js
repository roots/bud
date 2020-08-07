import {useState, useEffect} from 'react'
import {ProgressPlugin} from 'webpack'

/**
 * useProgress: Webpack ProgressPlugin
 * @return {object}
 */
const useProgress = bud => {
  const [progressPlugin, setProgressPlugin] = useState()
  const [percentage, setPercentage] = useState(0)
  const [message, setMessage] = useState(null)
  useEffect(() => {
    if (!progressPlugin) {
      setProgressPlugin(
        new ProgressPlugin({
          activeModules: true,
          modules: true,
          handler(percentage, message) {
            setPercentage(percentage)
            setMessage(message)
          },
        }),
      )

      bud.logger.info({name: 'bud.compiler'}, 'progress plugin created.')
    }
  }, [])

  return {progressPlugin, percentage, message}
}

export {useProgress}
