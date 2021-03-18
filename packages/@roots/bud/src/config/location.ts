import {Framework} from '@roots/bud-framework'

export const location: Framework.Config['location'] = {
  project: process.cwd(),
  src: 'src',
  dist: 'dist',
  modules: 'node_modules',
  publicPath: '/',
  records: 'records.json',
  storage: '.bud',
}
