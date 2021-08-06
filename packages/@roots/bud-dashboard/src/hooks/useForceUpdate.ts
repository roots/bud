import {React} from '@roots/bud-support'

export const useForceUpdate = () => {
  const [, forceUpdate] = React.useState(true)

  return React.useCallback(() => {
    forceUpdate(s => !s)
  }, [])
}
