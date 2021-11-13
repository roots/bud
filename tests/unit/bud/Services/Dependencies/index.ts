import {Bud, factory} from '@roots/bud'
import {Dependencies} from '@roots/bud/src/services/Dependencies'
import {Dependencies as DependenciesManager} from '@roots/dependencies'
import {Yarn} from '@roots/dependencies/src/yarn'

describe('bud.project', function () {
  let bud: Bud
  let dependencies: Dependencies
  let manager: DependenciesManager

  beforeAll(async () => {
    bud = await factory({
      config: {
        features: {
          dashboard: false,
          log: false,
        },
      },
    })

    dependencies = new Dependencies(bud)
    dependencies.register()

    manager = new DependenciesManager(bud.path('project'))
  })

  it('has dependencies name', () => {
    expect(dependencies.ident).toBe('bud.dependencies')
  })

  it('has a register method', () => {
    expect(dependencies.manager).toBeInstanceOf(
      DependenciesManager,
    )
  })

  it('isYarn is true', () => {
    expect(dependencies.manager.isYarn()).toBe(true)
  })

  it('dependencies manager returns yarn', () => {
    expect(dependencies.manager.client).toBeInstanceOf(Yarn)
  })

  it('dependencies manager client has path registered', () => {
    expect(manager.client.path).toBe(process.cwd())
  })

  test.todo('dependencies manager returns npm')

  it('has a install method', () => {
    expect(dependencies.install).toBeInstanceOf(Function)
  })

  test.todo('test install method')
})
