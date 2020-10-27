import {errorConfig} from './errors'
import type {Config} from './types/tailwindcss'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindcss = require('tailwindcss')

export const tailwind = function (
  params: Omit<Config, null>,
): Framework.Bud {
  const project = this.disk.get('project')

  project.get('tailwind.config.js') &&
    errorConfig(project.get('tailwind.config.js'))

  this.css.addPlugin([tailwindcss(params)])

  return this
}
