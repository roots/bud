import {Extension} from '@roots/bud-framework'

import { makeAlias } from './makeAlias'
import * as loader from './vue.loader'
import * as styleLoader from './vue.styleLoader'

/** @public */
export type extension = Extension.Module<{ runtimeOnly: boolean }>

/** @public */
export const name: extension['name'] = '@roots/bud-vue'

/** @public */
export const options: extension['options'] = {runtimeOnly: true}

/** @public */
export const boot: extension['boot'] = async (app, logger) => {
  logger.log('booting vue extension')

  const extensionPath = await app.module.path('@roots/bud-vue')
  logger.info('vue extension booting from', extensionPath)

  await loader.set(extensionPath, app, logger)
  await styleLoader.set(extensionPath, app, logger)
  
  app.hooks.on('build.module.rules.before', ruleset => [
    app.build
      .makeRule()
      .setTest(app.store.get('patterns.vue'))
      .setUse(items => [`vue`, ...items])
      .toWebpack(),
    ...(ruleset ?? []),
  ])

  .hooks.on('build.resolve.extensions', ext => ext.add('.vue'))

  .hooks.async('build.resolve.alias', async all => {
    const vue = await makeAlias(extensionPath, app, logger)
    return Object.assign(all, {vue})
  })
}
