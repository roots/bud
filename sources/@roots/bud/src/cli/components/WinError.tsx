import {Error} from '@roots/bud-dashboard/app'
import {BudError} from '@roots/bud-support/errors'

export const WinError = () => (
  <Error
    error={
      new BudError(`Windows is not supported`, {
        props: {
          details: `Please install WSL: https://learn.microsoft.com/en-us/windows/wsl/install`,
        },
      })
    }
  />
)
