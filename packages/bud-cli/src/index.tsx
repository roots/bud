import React from 'React'
import {render, Instance} from 'ink'

import App, {ApplicationCliProps} from './components/App'
import Console from './components/Console'
import Screen from './components/Screen'
import Title from './components/Title'
import Prettier from './components/Prettier'

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
export {Console, Screen, Title, Prettier}
export {ApplicationCliProps, Instance}
