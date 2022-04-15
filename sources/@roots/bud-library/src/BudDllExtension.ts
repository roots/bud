import {Extension} from '@roots/bud-framework'
import AutoDllPlugin from 'autodll-webpack-plugin'

import {library} from './library'

export type BudDllExtension = Extension.Plugin<
  AutoDllPlugin,
  AutoDllPlugin.Options
>

export const BudDllExtension: BudDllExtension = {
  label: '@roots/bud-library',
  register: async app => app.api.bindFacade('library', library),
}
