import StylelintPlugin from 'stylelint-webpack-plugin'

type Adapter = () => {make: () => any}

/**
 * Adapter: Stylelint Webpack Plugin
 */
const adapter: Adapter = () => ({
  setOptions: function (this: any) {
    return {
      configFile: this.bud.configs.get('stylelint'),
    }
  },
  make: function (this: any) {
    return new StylelintPlugin(this.options)
  },
  when: function (this: any) {
    return this.bud.features.enabled('stylelint')
  },
})

export default adapter
