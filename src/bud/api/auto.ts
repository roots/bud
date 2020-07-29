import {Bud, Auto} from './types'

const auto: Auto = function (
  this: Bud,
  options: {
    [key: string]: string[]
  },
): Bud {
  Object.entries(options).forEach(([key, modules]) => {
    modules.forEach(handle => {
      this.options.merge('auto', {[handle]: key})
    })
  })

  return this
}

export {auto}
