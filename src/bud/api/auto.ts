import {Bud, Auto} from './types'

const auto: Auto = function (
  this: Bud,
  options: {
    [key: string]: string[]
  },
): Bud {
  this.logger.info({options}, `[api] bud.auto called`)

  this.hooks.call('pre_auto', options)

  Object.entries(options).forEach(([key, modules]) => {
    modules.forEach(handle => {
      this.options.set('auto', {
        ...this.options.get('auto'),
        [handle]: key,
      })
    })
  })

  this.hooks.call('post_auto', this)

  return this
}

export {auto}
