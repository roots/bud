import {Framework} from '@roots/bud-framework'

/** @public */
export const set = async (
  extensionPath: string,
  app: Framework,
  logger: any,
) => {
  logger.log('setting vue-style-loader')

  const path = app.module.resolvePreferred(
    'vue-style-loader',
    extensionPath,
  )
  
  logger.info('using vue-style-loader:', path)

  app.build
    .setLoader('vue-style', path)
    .setItem('vue-style', { loader: 'vue-style' })
  
  app.build.rules.css.setUse(items => ['vue-style', ...items])
}
