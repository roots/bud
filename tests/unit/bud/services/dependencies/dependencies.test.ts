import {Bud, factory, mockProject} from '../../../../util/bud'
import {Dependencies} from '@roots/bud/src/services/Dependencies'
import {Dependencies as DependenciesManager} from '@roots/dependencies'

describe('bud.project', function () {
  let bud: Bud
  let dependencies: Dependencies
  let manager: DependenciesManager

  beforeAll(async () => {
    bud = await factory({
      features: {
        dashboard: false,
        log: false,
      },
    })

    dependencies = new Dependencies(bud)
    await dependencies.register()

    manager = new DependenciesManager(bud.path('project'))
  })

  it('has dependencies name', () => {
    expect(dependencies.ident).toBe('dependencies')
  })

  it('dependencies manager client has path registered', () => {
    expect(manager.client.path).toBe(mockProject.path)
  })

  test.todo('dependencies manager returns npm')

  it('has a install method', () => {
    expect(dependencies.install).toBeInstanceOf(Function)
  })

  test.todo('test install method')
})
