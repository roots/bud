import {Error} from '@roots/bud-dashboard'
import {Framework} from '@roots/bud-framework'

/**
 * Command base class
 */
export class Builder {
  public jsonName(app) {
    return `${app.name}.config.json`
  }

  public fluentName(app) {
    return `${app.name}.config.js`
  }

  /**
   * Preflight check
   */
  public run(app: Framework) {
    const projectFiles = app.disk.get('project')
    const jsonConfig = this.jsonName(app)
    const fluentConfig = this.fluentName(app)

    // Guard against multi config
    projectFiles.has(jsonConfig) &&
      projectFiles.has(fluentConfig) &&
      errorMultiConf(app)

    // Guard against no config
    !projectFiles.has(jsonConfig) &&
      !projectFiles.has(fluentConfig) &&
      errorNoConf(app)

    // Run
    app = require(projectFiles.get(fluentConfig))(app).run()

    return true
  }
}

function errorMultiConf(app) {
  Error(
    `Project contains both a ${this.jsonName(
      app,
    )} and ${this.fluentName(
      app,
    )}. They are mutually exclusive.`,
    'Multiple config sources found.',
  )
}

function errorNoConf(app) {
  Error(
    `
Project doesn't seem to have a config. If you need a starter config run:

$ ${app.name} publish @roots/bud-support ${this.fluentName(
      app,
    )}`,
    'No config sources found.',
  )
}
