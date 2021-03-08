import {Framework} from '@roots/bud-framework'
import {Error} from '@roots/bud-dashboard'
import {CLI} from './CLI'

/**
 * Command base class
 */
export default class Config {
  public app: Framework
  public cli: CLI

  public constructor(app: Framework, cli: CLI) {
    this.app = app.bootstrap().register().boot()
    this.cli = cli
  }

  public get project() {
    return this.app.disk.get('project')
  }

  public get jsonName() {
    return `${this.cli.name}.config.json`
  }

  public get fluentName() {
    return `${this.cli.name}.config.js`
  }

  /**
   * Preflight check
   */
  public run() {
    // Guard against multi config
    this.project.has(this.jsonName) &&
      this.project.has(this.fluentName) &&
      errorMultiConf.bind(this)()

    // Guard against no config
    !this.project.has(this.jsonName) &&
      !this.project.has(this.fluentName) &&
      errorNoConf.bind(this)()

    // Run
    this.project.has(this.fluentName)
      ? require(this.project.get(this.fluentName))
      : this.app
          .entry(
            this.project.readJson(this.jsonName).entrypoints,
          )
          .run()

    return true
  }
}

function errorMultiConf() {
  Error(
    `Project contains both a ${this.jsonName} and ${this.fluentName}. They are mutually exclusive.`,
    'Multiple config sources found.',
  )
}

function errorNoConf() {
  Error(
    `
Project doesn't seem to have a config. If you need a starter config run:

$ ${this.cli.name} publish @roots/bud-support ${this.fluentName}`,
    'No config sources found.',
  )
}
