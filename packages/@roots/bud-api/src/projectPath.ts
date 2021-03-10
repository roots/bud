import {Framework} from '@roots/bud-framework'

type ProjectPath = (this: Framework, path: string) => Framework

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
  this.store.set('locations.project', path)

  this.srcPath(this.src())
  this.distPath(this.dist())

  return this
}
