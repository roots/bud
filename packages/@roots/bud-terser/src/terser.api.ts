import {Framework, Terser} from './terser.interface'

export interface terser {
  (this: Framework, options: Terser.Options): Framework
}

export const terser: terser = function (
  this: Framework,
  options: Terser.Options,
): Framework {
  this.hooks.on(
    'extension/terser-webpack-plugin/options',
    () => options,
  )

  return this
}
