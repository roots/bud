import Bud from '@roots/bud-types'
import bud from '@roots/bud'
import sageFeatures, {SelectFeatures} from './sageFeatures'

/**
 * Sage
 */
export interface Sage extends Bud {
  support(this: Sage, features: SelectFeatures): Sage
}

const sage: Sage = bud
  .srcPath('resources/assets')
  .distPath('dist')
  .alias({
    '@fonts': bud.src('fonts'),
    '@images': bud.src('images'),
    '@scripts': bud.src('scripts'),
    '@styles': bud.src('styles'),
  })
  .provide({
    jquery: ['$', 'window.jQuery'],
  })
  .map()
  .hash()
  .vendor()
  .when(bud.mode.is('production'), () => {
    bud.mini().runtimeManifest()
  })

sage.apply('sageFeatures', sageFeatures)

export {sage as default}
