import type {Extension, Framework} from '@roots/bud-framework'

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
    const isInstalled = name =>
      app.project.getKeys('installed').includes(name)

    const ensureAllInstalled = modules =>
      modules.every(isInstalled)

    ensureAllInstalled(['tailwindcss', 'postcss']) &&
      app.hasOwnProperty('postcss') &&
      tailwindConfig.bind(app)()
  },
}

export {BudTailwindCssExtension}
