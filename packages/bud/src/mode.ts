import {BudInterface} from '.'
import {Configuration} from 'webpack'

interface Mode {
  is: (check: Configuration['mode']) => boolean
  get: () => Configuration['mode']
  set: (check: Configuration['mode']) => BudInterface
}

const mode: (bud: BudInterface) => Mode = bud => ({
  is: check => bud.options.is('webpack.mode', check),
  get: () => bud.options.get('webpack.mode'),
  set: mode => {
    bud.options.set('webpack.mode', mode)
    return bud
  },
})

export {mode as default, Mode}
