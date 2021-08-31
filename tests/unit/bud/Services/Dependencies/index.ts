import {factory, Framework} from '@roots/bud'
import {Dependencies} from '@roots/bud/src/Bud/services/Dependencies'
import {Dependencies as DependenciesManager} from '@roots/dependencies'
import {Yarn} from '@roots/dependencies/src/yarn'

describe('bud.project', function () {
  let bud: Framework
  let dependencies: Dependencies
  let manager: DependenciesManager

  beforeAll(async () => {
    bud = factory()

    dependencies = new Dependencies(bud)
    dependencies.register()

    manager = new DependenciesManager(bud.path('project'))
  })

  afterAll(done => {
    bud.close(done)
  })

  it('has dependencies name', () => {
    expect(dependencies.name).toBe('dependencies')
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

  it('has a readProjectJson method', () => {
    expect(dependencies.readProjectJson).toBeInstanceOf(Function)
  })

  it('readProjectJson', () => {
    expect(dependencies.readProjectJson().name).toMatchSnapshot()
  })

  it('has a overrideInstallTarget method', () => {
    expect(dependencies.overrideInstallTarget).toBeInstanceOf(
      Function,
    )
  })

  it('overrideInstallTarget returns true if proposed install does not match manifest', () => {
    const override = dependencies.overrideInstallTarget(
      'react',
      'dependencies',
    )

    expect(override).toBe(true)
  })

  it('overrideInstallTarget returns false if proposed install matches manifest', () => {
    const noOverride = dependencies.overrideInstallTarget(
      'jest',
      'devDependencies',
    )

    expect(noOverride).toBe(false)
  })

  it('has a install method', () => {
    expect(dependencies.install).toBeInstanceOf(Function)
  })

  test.todo('test install method')
})
