import {Framework} from '@roots/bud-framework'
import {
  Dependencies as DependenciesManager,
  IDependencyManager,
} from '@roots/dependencies'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'
import React from 'react'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'
import {Base} from './Base'

export class Dependencies extends Base {
  public get pkg() {
    return readJsonSync(this.path('project', 'package.json'))
  }

  public get isYarn() {
    return this.manager.isYarn()
  }

  public get client(): IDependencyManager {
    return this.manager.client
  }

  @bind
  public boot(app: Framework) {
    this.path = app.path
    this.dashboard = app.dashboard

    this.manager = new DependenciesManager(this.path('project'))
  }

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

  @bind
  public installDev(deps: string[], source: string): void {
    deps
      .filter(dep => this.shouldInstall(dep, 'devDependencies'))
      .forEach(dep => {
        this.notify(dep, source)
        this.client.install(true, dep)
      })
  }

  @bind
  public install(deps: string[], source: string): void {
    deps
      .filter(dep => this.shouldInstall(dep, 'dependencies'))
      .forEach(dep => {
        this.notify(dep, source)
        this.client.install(false, dep)
      })
  }

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
