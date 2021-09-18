import {Ink, React} from '@roots/bud-support'

/**
 * Container
 *
 * @public
 */
export const Main = ({children}) => (
  <Ink.Box
    justifyContent="space-between"
    display="flex"
    flexDirection="column">
    {children}
  </Ink.Box>
)
