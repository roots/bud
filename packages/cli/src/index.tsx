import React from 'react'
import {render, Instance} from 'ink'

import App, {ApplicationCliProps} from './containers/App'

export type ApplicationCli = (
  props: ApplicationCliProps,
) => Instance

const app: ApplicationCli = ({name, compiler, server}) =>
  render(<App name={name} compiler={compiler} server={server} />)

export default app
export {ApplicationCliProps, Instance}
