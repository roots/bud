import {Extension} from '@roots/bud-framework'

import {makeAlias} from './makeAlias'
import * as loader from './vue.loader'
import * as styleLoader from './vue.styleLoader'

/**
 * Vue support
 *
 * @public
 */
export class Vue extends Extension.Extension {
  public name = '@roots/bud-vue'

  public options = {runtimeOnly: true}

  public async boot() {
    this.logger.log('booting vue extension')

    const extensionPath = await this.app.module.path('@roots/bud-vue')
    this.logger.info('vue extension booting from', extensionPath)

    await loader.set(extensionPath, this.app, this.logger)
    await styleLoader.set(extensionPath, this.app, this.logger)

    this.app.hooks
      .on('build.module.rules.before', ruleset => [
        this.app.build
          .makeRule()
          .setTest(this.app.hooks.filter('pattern.vue'))
          .setUse(items => [`vue`, ...items])
          .toWebpack(),
        ...(ruleset ?? []),
      ])

      .hooks.on('build.resolve.extensions', ext => ext.add('.vue'))

      .hooks.async('build.resolve.alias', async all => {
        const vue = await makeAlias(extensionPath, this.app, this.logger)
        return Object.assign(all, {vue})
      })
  }
}
