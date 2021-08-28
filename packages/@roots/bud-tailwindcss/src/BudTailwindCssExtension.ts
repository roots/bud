import type {Framework, Module} from '@roots/bud-framework'

import {tailwindConfig} from './tailwindConfig'

interface BudTailwindCssExtension extends Module {
  api: {tailwind: tailwindConfig}
  boot: (app: Framework) => void
}

const BudTailwindCssExtension: BudTailwindCssExtension = {
  name: '@roots/bud-tailwindcss',

  api: {tailwind: tailwindConfig},

  boot: app => {
    tailwindConfig.bind(app)()
  },
}

export {BudTailwindCssExtension}
