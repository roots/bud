import {React} from '@roots/bud-support'

/**
 * Forces React re-renders
 *
 * @public
 */
export const useForceUpdate = () => {
  const [, forceUpdate] = React.useState(true)

  return React.useCallback(() => {
    forceUpdate(s => !s)
  }, [])
}
