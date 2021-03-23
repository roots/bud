import {Framework} from '@roots/bud-framework'

type ProjectPath = (path: string) => Framework

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.projectPath [💁 Fluent]
     *
     * Set the root directory reference.
     *
     * By default this directory is set as the current working dir. [🔗 Documentation](#)
     *
     * ### Usage
     *
     * ```js
     * bud.projectPath('build')
     * ```
     */
    projectPath: ProjectPath & Framework.Api.ProjectPath
  }

  namespace Framework.Api {
    export {ProjectPath}
  }
}

export const projectPath: ProjectPath = function (path?) {
  this.store.has('args.project') &&
    this.publish({'location/project': path}, 'api/projectPath')

  return this
}
