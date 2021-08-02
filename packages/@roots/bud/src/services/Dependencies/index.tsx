/**
 * @module Bud.Dependencies
 */

import {Service} from '@roots/bud-framework'
import {Dependencies as DependenciesManager} from '@roots/dependencies'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'
import {Static, Text} from 'ink'
import {isEqual} from 'lodash'
import * as React from 'react'

/**
 * Service: Dependencies
 *
 * @noInheritDoc
 */
class Dependencies extends Service<null> {
  /**
   * @property {string} name
   */
  public name = 'dependencies'

  /**
   * @property {DependenciesManager} manager
   */
  public manager: DependenciesManager

  /**
   * dependencies.readProjectJson
   *
   * Read project JSON and return as a hash
   */
  @bind
  public readProjectJson() {
    return readJsonSync(this.app.path('project', 'package.json'))
  }

  /**
   * dependencies.register
   *
   * @see {Service.register}
   */
  @bind
  public register() {
    this.manager = new DependenciesManager(
      this.app.path('project'),
    )
  }

  /**
   * dependencies.shouldInstall
   *
   * Returns a boolean value representing if a package is eligible for installation
   */
  @bind
  public shouldInstall(dep: string): boolean {
    const pkgJson = this.readProjectJson()

    return (
      !pkgJson ||
      !Object.keys({
        ...(pkgJson['dependencies'] ?? {}),
        ...(pkgJson['devDependencies'] ?? {}),
      })?.includes(dep)
    )
  }

  /**
   * dependencies.install
   *
   * Install an array of dependencies and/or devDependencies
   */
  @bind
  public install(
    deps: {
      name: string
      ver: string
      source: string
      type: 'devDependencies' | 'dependencies'
    }[],
  ): void {
    deps

      /**
       * Filter out ineligible packages and notify user
       */
      .filter(({source, name}) => {
        if (!this.shouldInstall(name)) {
          this.app.dashboard.render(
            <Static items={[{name}]}>
              {({name}) => (
                <Text key={name}>
                  [{source}] {name} is already installed
                </Text>
              )}
            </Static>,
          )

          return false
        }

        return true
      })

      /**
       * Attempt installation of eligible packages
       */
      .forEach(dep => {
        this.app.dashboard.render(
          <Static
            items={[
              `[${dep.source}] Installing ${dep.type} ${dep.name}@${dep.ver}`,
            ]}>
            {msg => <Text key={`${msg}`}>{msg}</Text>}
          </Static>,
        )

        try {
          const result = this.manager.client
            .install(
              isEqual(dep.type, 'devDependencies'),
              `${dep.name}@${dep.ver}`,
            )
            .output.toString()

          this.app.dashboard.render(
            <Static items={[result]}>
              {msg => <Text key={`${msg}`}>{msg}</Text>}
            </Static>,
          )
        } catch (err) {
          this.app.dashboard.renderError(
            `Error installing ${dep.name}. Requested by ${
              dep.source
            } ${JSON.stringify(err)}`,
            `Package installation error`,
          )
        }
      })
  }
}

export {Dependencies}
