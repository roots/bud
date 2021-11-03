import type {Extension, Framework} from '@roots/bud-framework'

import {tailwind} from './tailwind.config'

export interface BudTailwindCssExtension
  extends Extension.Module {
  name: '@roots/bud-tailwindcss'
  api: {tailwind: tailwind}
  boot(app: Framework): void
}

export const BudTailwindCssExtension: BudTailwindCssExtension = {
  name: '@roots/bud-tailwindcss',

  api: {tailwind},

  boot: app => {
    const isInstalled = name =>
      app.project.getKeys('installed').includes(name)

    const ensureAllInstalled = modules => {
      const meetsRequirements = modules.every(isInstalled)

      if (meetsRequirements) {
        app.success(`tailwindcss requirements met`)
        return true
      }

      app.error(`tailwindcss requirements not met`)

      return false
    }

    ensureAllInstalled(['tailwindcss', 'postcss']) &&
      app.tailwind()
  },
}
