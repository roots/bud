import {
  Api,
  Dashboard,
  Framework,
  Service,
} from '@roots/bud-framework'
import {
  Dependencies as DependenciesManager,
  IDependencyManager,
} from '@roots/dependencies'
import {boundMethod as bind} from 'autobind-decorator'
import fs from 'fs-extra'
import React from 'react'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'

/**
 * Framework/Dependencies
 *
 * [🏡 Project home](https://roots.io/bud)
 */
export class Dependencies extends Service {
  /**
   * Service name
   */
  public name = 'service/dependencies'

  /**
   * Dependencies manager
   */
  public manager: DependenciesManager

  /**
   * Path
   */
  public path: Api.Path

  /**
   * Dashboard
   */
  public dashboard: Dashboard

  /**
   * Project package.json
   */
  public get pkg() {
    return fs.readJsonSync(this.path('project', 'package.json'))
  }

  /**
   * Is framework being run with yarn
   */
  public get isYarn() {
    return this.manager.isYarn()
  }

  /**
   * Get client
   */
  public get client(): IDependencyManager {
    return this.manager.client
  }

  /**
   * Boot
   */
  @bind
  public boot(app: Framework) {
    this.path = app.path
    this.dashboard = app.dashboard

    this.manager = new DependenciesManager(this.path('project'))
  }

  /**
   * Should install dependency
   */
  @bind
  public shouldInstall(
    dep: string,
    type: 'dependencies' | 'devDependencies',
  ) {
    return (
      !this.pkg[type] ||
      !Object.keys(this.pkg[type]).includes(dep)
    )
  }

  /**
   * Install development dependency
   */
  @bind
  public installDev(deps: string[], source: string): void {
    deps
      .filter(dep => this.shouldInstall(dep, 'devDependencies'))
      .forEach(dep => {
        this.notify(dep, source)
        this.client.install(true, dep)
      })
  }

  /**
   * Install dependency
   */
  @bind
  public install(deps: string[], source: string): void {
    deps
      .filter(dep => this.shouldInstall(dep, 'dependencies'))
      .forEach(dep => {
        this.notify(dep, source)
        this.client.install(false, dep)
      })
  }

  /**
   * Display information to console
   */
  @bind
  public notify(dep: string, source: string) {
    this.dashboard.write(
      <Box flexDirection="row">
        <Text>
          <Text color="green">
            <Spinner /> {source}{' '}
          </Text>
          Adding <Text color="green">{dep}</Text> to project.
        </Text>
      </Box>,
    )
  }
}
