import {Error} from '@roots/bud-dashboard/components/error'
import {BudError} from '@roots/bud-support/errors'

export const WinError = () => (
  <Error
    error={
      new BudError(`Windows is not supported`, {
        details: `Please install WSL: https://learn.microsoft.com/en-us/windows/wsl/install`,
      })
    }
  />
)
