import {Bud, Auto} from './types'

const auto: Auto = function (
  this: Bud,
  options: {
    [key: string]: string[]
  },
): Bud {
  this.logger.info({name: 'bud.api', function: 'bud.auto', options}, `bud.auto called`)

  this.hooks.call('api.auto.pre')

  Object.entries(options).forEach(([key, modules]) => {
    modules.forEach(handle => {
      this.options.set('auto', {
        ...this.options.get('auto'),
        [handle]: key,
      })
    })
  })

  this.hooks.call('api.auto.post')

  return this
}

export {auto}
