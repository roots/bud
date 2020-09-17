import React from 'React'
import {render, Instance} from 'ink'

import App, {ApplicationCliProps} from './components/App'
import Console from './components/Console'
import Screen from './components/Screen'
import Title from './components/Title'
import Prettier from './components/Prettier'

const app = ({
  name,
  webpackConfig,
  serverConfig,
  terminate,
}: ApplicationCliProps): Instance =>
  render(
    <App
      name={name}
      webpackConfig={webpackConfig}
      serverConfig={serverConfig}
      terminate={terminate}
    />,
  )

export {
  App,
  ApplicationCliProps,
  Console,
  Screen,
  Title,
  Prettier,
  app,
  Instance,
}
