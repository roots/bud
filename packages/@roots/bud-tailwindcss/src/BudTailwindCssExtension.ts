import type {Framework, Module} from '@roots/bud-framework'

import {tailwindConfig} from './tailwindConfig'

interface BudTailwindCssExtension extends Module {
  boot: (app: Framework) => void
  api: {tailwind: tailwindConfig}
}

const BudTailwindCssExtension: BudTailwindCssExtension = {
  name: '@roots/bud-tailwindcss',

  api: {tailwind: tailwindConfig},

  boot: app => app.tailwind(),
}

export {BudTailwindCssExtension}
