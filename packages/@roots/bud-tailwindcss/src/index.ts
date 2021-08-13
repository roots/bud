import type {Framework, Module} from '@roots/bud-framework'

import config from './config'

interface extension extends Module {
  boot: (app: Framework) => void
  api: {tailwind: config}
}

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Configure tailwindcss.
     *
     * @usage
     * ```js
     * bud.tailwind('tailwind.config.js')
     * ```
     *
     * ```js
     * bud.tailwind({
     *   theme: {
     *     // etc
     *   }
     * })
     */
    tailwind: config
  }

  namespace Framework {
    interface Extensions {
      '@roots/bud-tailwindcss': extension
    }
  }
}

const extension: extension = {
  name: '@roots/bud-tailwindcss',
  api: {tailwind: config},
  boot: app => app.tailwind(),
}

export const {name, api, boot} = extension
export default extension
