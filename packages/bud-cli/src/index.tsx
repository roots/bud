import React from 'React'
import {render, Instance} from 'ink'

import App, {ApplicationCliProps} from './containers/App'

export type ApplicationCli = (
  props: ApplicationCliProps,
) => Instance

const app: ApplicationCli = ({
  name,
  compiler,
  server,
  terminate,
}) =>
  render(
    <App
      name={name}
      compiler={compiler}
      server={server}
      terminate={terminate}
    />,
  )

export default app
export {ApplicationCliProps, Instance}
