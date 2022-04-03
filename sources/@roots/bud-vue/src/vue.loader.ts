import { Framework } from '@roots/bud-framework'

/** @public */
export const set = async (extensionPath: string, app: Framework, logger) => {
  logger.log('setting vue-loader')

  const path = app.module.resolvePreferred('vue-loader', extensionPath)
  app.build.setLoader('vue', path).setItem('vue', {loader: 'vue'})
  
  logger.info('using vue-loader:', path)

  const VueLoader = await import(path)
  await app.extensions.add({
    name: 'vue-loader-plugin',
    make: () => new VueLoader.VueLoaderPlugin(),
  })

  logger.debug('VueLoader', VueLoader)
}
