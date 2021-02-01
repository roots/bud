import {Bud} from '@roots/bud'

/**
 * PostCSSConfig API
 */
export class PostCssConfig implements Bud.PostCss {
  public app: Bud

  public key = 'items.postcss.options.postcssOptions'

  public constructor({app}: {app: Bud}) {
    this.app = app
    this.addPlugin.bind(this)
    this.getConfig.bind(this)
    this.setConfig.bind(this)
  }

  public addPlugin(plugin: any, options: any) {
    this.plugins = [
      ...this.plugins,
      options ? [plugin, options] : plugin,
    ]

    return this.app
  }

  public getConfig() {
    return this.options
  }

  public setConfig(options: any) {
    this.options = options

    return this.app
  }

  public get options() {
    return this.app.build.get(this.key)
  }

  public set options(options: any) {
    this.app.build.set(this.key, options)
  }

  public get plugins() {
    return this.app.build.get(this.optionKey('plugins'))
  }

  public set plugins(plugins: any) {
    this.app.build.set(this.optionKey('plugins'), plugins)
  }

  protected optionKey(key: string) {
    return `${this.key}.${key}`
  }
}
