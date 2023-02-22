import {React} from '@roots/bud-support/ink'

import {Error} from './Error.js'

export const WinError = () => (
  <Error
    name="Windows is not supported"
    message="Please install WSL: https://learn.microsoft.com/en-us/windows/wsl/install"
  />
)
