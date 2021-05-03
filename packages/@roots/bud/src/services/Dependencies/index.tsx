import {Dependencies as DependenciesManager} from '@roots/dependencies'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'
import React from 'react'
import {Text, Static} from 'ink'
import {Base} from './Base'

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
  public shouldInstall(dep: string, source: string) {
    const pkgJson = this.pkg()

    const shouldInstall =
      !pkgJson ||
      !Object.keys({
        ...(pkgJson['dependencies'] ?? {}),
        ...(pkgJson['devDependencies'] ?? {}),
      }).includes(dep)

    if (!shouldInstall) {
      this.app.dashboard.render(
        <Static items={[{dep}]}>
          {({dep}) => (
            <Text key={dep}>
              {source}: {dep} is already installed
            </Text>
          )}
        </Static>,
      )
    }

    return shouldInstall
  }

  @bind
  public installDev(
    deps: {[key: string]: string},
    src: string,
  ): void {
    Object.entries(deps)
      .filter(([dep]) => this.shouldInstall(dep, src))
      .forEach(([dep, ver]) => {
        this.notify([
          {msg: `Installing dev dependency: ${dep}@${ver}`, src},
          {
            msg: this.manager.client
              .install(true, `${dep}@${ver}`)
              .output.toString(),
            src,
          },
        ])
      })
  }

  @bind
  public install(
    deps: {[key: string]: string},
    src: string,
  ): void {
    Object.entries(deps)
      .filter(([dep]) => this.shouldInstall(dep, src))
      .forEach(([dep, ver]) => {
        this.notify([
          {msg: `Installing dependency: ${dep}@${ver}`, src},
          {
            msg: this.manager.client
              .install(false, `${dep}@${ver}`)
              .output.toString(),
            src,
          },
        ])
      })
  }

  @bind
  public notify(notices: {msg: string; src: string}[]) {
    this.app.dashboard.render(
      <Static items={notices}>
        {({msg, src}) => (
          <Text key={`${msg}${src}`}>
            <Text color="blue">{src}</Text>: {msg}
          </Text>
        )}
      </Static>,
    )
  }
}
