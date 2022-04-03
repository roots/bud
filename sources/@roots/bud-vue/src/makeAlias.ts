import {Extension, Framework} from '@roots/bud-framework'

export type VueExtension = Extension.Module

export type VueAlias =
  | `vue/dist/vue.runtime.esm.js`
  | `vue/dist/vue.esm.js`
  | `vue/dist/vue.runtime.esm-bundler.js`
  | `vue/dist/vue.esm-bundler.js`

export const makeAlias = async (extensionPath: string, app: Framework, logger): Promise<VueAlias> => {
  const manifest = await app.module.readManifest(['vue', [extensionPath, 'vue']])

  logger.info('Using vue version', manifest.version)

  const options = app.extensions.get('@roots/bud-vue').options

  if (manifest.version.startsWith('2'))
    return options.is('runtimeOnly', true)
      ? 'vue/dist/vue.runtime.esm.js'
      : 'vue/dist/vue.esm.js'

  return options.is('runtimeOnly', true)
    ? 'vue/dist/vue.runtime.esm-bundler.js'
    : 'vue/dist/vue.esm-bundler.js'
}
