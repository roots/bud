import {Tailwind} from './interface'
import * as api from './api'

const tailwindcss: Tailwind.Extension = {
  name: '@roots/bud-tailwindcss',
  api,

  boot: app => {
    /**
     * Exit early if peerDepenedencies unmet
     */
    if (
      !app.discovery.hasPeerDependency('postcss') ||
      !app.discovery.hasPeerDependency('tailwindcss')
    )
      return

    const implementation = app.discovery.hasPeerDependency(
      '@tailwindcss/jit',
    )
      ? '@tailwindcss/jit'
      : 'tailwindcss'

    app.tailwind(null, implementation)
  },
}

export default tailwindcss

export {api}
export const {name, boot} = tailwindcss
