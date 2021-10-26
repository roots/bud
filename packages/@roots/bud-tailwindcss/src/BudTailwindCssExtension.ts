import type {Extension, Framework} from '@roots/bud-framework'
import {safeRequire} from '@roots/bud-support'

import {tailwindConfig} from './tailwindConfig'

interface BudTailwindCssExtension extends Extension.Module {
  name: '@roots/bud-tailwindcss'
  api: {tailwind: tailwindConfig}
  boot(app: Framework): void
}

const BudTailwindCssExtension: BudTailwindCssExtension = {
  name: '@roots/bud-tailwindcss',

  api: {tailwind: tailwindConfig},

  boot: app => {
    safeRequire('tailwindcss') && tailwindConfig.bind(app)()
  },
}

export {BudTailwindCssExtension}
