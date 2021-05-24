import {Framework} from '@roots/bud'

export default (bud: Framework) => {
  bud.override(webpackConfig => {
    webpackConfig.entry = {
      app: 'scripts/app.js',
    }

    return webpackConfig
  })

  return bud
}
