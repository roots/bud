import {Service} from '@roots/bud-framework'
import {Ink, React} from '@roots/bud-support'
import {Dependencies as DependenciesManager} from '@roots/dependencies'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'
import {isEqual} from 'lodash'

class Dependencies extends Service<null> {
  public name = 'dependencies'

  /**
   * Interfaces with package manager
   */
  public manager: DependenciesManager

  @bind
  public register() {
    this.manager = new DependenciesManager(
      this.app.path('project'),
    )
  }

  @bind
  public readProjectJson() {
    return readJsonSync(this.app.path('project', 'package.json'))
  }

  @bind
  public overrideInstallTarget(
    dep: string,
    proposed: string,
  ): boolean {
    const pkgJson = this.readProjectJson()
    const checkAgainst =
      proposed == 'dependencies'
        ? 'devDependencies'
        : 'dependencies'

    if (Object.keys(pkgJson[checkAgainst] ?? {}).includes(dep)) {
      return true
    }

    return false
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
    this.app.dashboard.render(
      `Installing required peer dependencies`,
      `Installing`,
    )

    /**
     * Filter out ineligible packages
     */
    const installed = deps.map(dep => {
      this.app.dashboard.render(
        <>
          <Ink.Box marginBottom={1} flexDirection="column">
            <Ink.Text
              backgroundColor={this.app.store.get(
                'theme.colors.primary',
              )}
              color={this.app.store.get(
                'theme.colors.foreground',
              )}>
              Installing
            </Ink.Text>
          </Ink.Box>

          <Ink.Box marginBottom={1} flexDirection="column">
            <Ink.Text
              key={`${dep.name}-${dep.ver}`}>{`Installing ${dep.name}@${dep.ver}`}</Ink.Text>
          </Ink.Box>
        </>,
      )

      this.manager.client.install(
        isEqual(dep.type, 'devDependencies') &&
          !this.overrideInstallTarget(dep.name, dep.type),
        `${dep.name}@${dep.ver}`,
      )

      return dep
    })

    this.app.dashboard.render(
      <Ink.Box flexDirection="column">
        <Ink.Box marginBottom={1} flexDirection="column">
          <Ink.Text
            backgroundColor={this.app.store.get(
              'theme.colors.primary',
            )}
            color={this.app.store.get(
              'theme.colors.foreground',
            )}>
            Installation Complete
          </Ink.Text>
        </Ink.Box>

        {installed.length > 0 && (
          <Ink.Box marginBottom={1} flexDirection="column">
            {installed.map(dep => (
              <Ink.Text
                key={`${dep.name}-${dep.ver}`}>{`✓ ${dep.name}@${dep.ver}`}</Ink.Text>
            ))}
          </Ink.Box>
        )}
      </Ink.Box>,
    )
  }
}

export {Dependencies}
