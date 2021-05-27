import {Dependencies as DependenciesManager} from '@roots/dependencies'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'
import React from 'react'
import {Text, Static} from 'ink'
import {Base} from './Base'
import {isEqual} from 'lodash'

export class Dependencies extends Base {
  @bind
  public pkg() {
    return readJsonSync(this.app.path('project', 'package.json'))
  }

  @bind
  public register() {
    this.manager = new DependenciesManager(
      this.app.path('project'),
    )
  }

  @bind
  public shouldInstall(source: string, dep: string) {
    const pkgJson = this.pkg()

    const shouldInstall =
      !pkgJson ||
      !Object.keys({
        ...(pkgJson['dependencies'] ?? {}),
        ...(pkgJson['devDependencies'] ?? {}),
      })?.includes(dep)

    if (!shouldInstall) {
      this.app.dashboard.render(
        <Static items={[{dep}]}>
          {({dep}) => (
            <Text key={dep}>
              [{source}] {dep} is already installed
            </Text>
          )}
        </Static>,
      )
    }

    return shouldInstall
  }

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
      .filter(({source, name}) => {
        return this.shouldInstall(source, name)
      })
      .forEach(dep => {
        try {
          this.notify([
            {
              msg: `[${dep.source}] Installing ${dep.type} ${dep.name}@${dep.ver}`,
            },
            {
              msg: this.manager.client
                .install(
                  isEqual(dep.type, 'devDependencies'),
                  `${dep.name}@${dep.ver}`,
                )
                .output.toString(),
            },
          ])
        } catch (err) {
          console.error(
            `Error installing ${dep.name}. Requested by ${dep.source} ${err}`,
          )
        }
      })
  }

  @bind
  public notify(notices: {msg: string}[]) {
    this.app.dashboard.render(
      <Static items={notices}>
        {({msg}) => <Text key={`${msg}`}>{msg}</Text>}
      </Static>,
    )
  }
}
