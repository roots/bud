import Bud from '@roots/bud-types'

const mode: Bud.Mode.Factory = bud => ({
  is: check => bud.options.is('webpack.mode', check),
  get: () => bud.options.get('webpack.mode'),
  set: mode => {
    bud.options.set('webpack.mode', mode)

    return bud
  },
})

export {mode as default}
