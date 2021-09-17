import {Service} from '@roots/bud-framework'
import {Ink, React} from '@roots/bud-support'
import {Dependencies as DependenciesManager} from '@roots/dependencies'
import {boundMethod as bind} from 'autobind-decorator'
import {readJsonSync} from 'fs-extra'
import {isEqual} from 'lodash'

/**
 * Bud Dependencies Service class
 *
 * @public
 */
class Dependencies extends Service<null> {
  /**
   * {@inheritDoc @roots/bud-framework#Service.name}
   *
   * @public @override
   */
  public name = 'dependencies'

  /**
   * Dependencies installation manager
   *
   * @public
   */
  public manager: DependenciesManager

  /**
   * {@link @roots/bud-framework#Service.register}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public register() {
    this.manager = new DependenciesManager(
      this.app.path('project'),
    )
  }

  /**
   * Read project `package.json` manifest
   *
   * @returns {object}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public readProjectJson() {
    return readJsonSync(this.app.path('project', 'package.json'))
  }

  /**
   * Override installation target?
   *
   * @param dep - dependency in question
   * @param proposed - proposed installation target
   * @returns whether to install it differently than proposed
   *
   * @public
   * @decorator `@bind`
   */
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

  /**
   * Installs all the things
   *
   * @internalRemarks
   * #TODO: Fix this mess of a function and make it better. It's not good. -- GPT3
   *
   * @param deps - dependencies to install
   *
   * @public
   * @decorator `@bind`
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
              {' '}
              Installing{' '}
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
            {' '}
            Installation Complete{' '}
          </Ink.Text>
        </Ink.Box>

        {installed.length > 0 && (
          <Ink.Box marginBottom={1} flexDirection="column">
            {installed.map(dep => (
              <Ink.Text key={`${dep.name}-${dep.ver}`}>
                <Ink.Text
                  color={this.app.store.get(
                    'theme.colors.success',
                  )}>
                  ✓
                </Ink.Text>
                {` ${dep.name}@${dep.ver}`}
              </Ink.Text>
            ))}
          </Ink.Box>
        )}
      </Ink.Box>,
    )
  }
}

export {Dependencies}
