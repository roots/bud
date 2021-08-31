import {factory, Framework} from '@roots/bud'
import {Dependencies} from '@roots/bud/src/Bud/services/Dependencies'
import {Dependencies as DependenciesBase} from '@roots/dependencies'

describe('bud.project', function () {
  let bud: Framework
  let dependencies: Dependencies

  beforeAll(async () => {
    bud = factory()

    dependencies = new Dependencies(bud)
    dependencies.register()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('has dependencies name', () => {
    expect(dependencies.name).toBe('dependencies')
  })

  it('has a register method', () => {
    expect(dependencies.manager).toBeInstanceOf(DependenciesBase)
  })

  it('has a readProjectJson method', () => {
    expect(dependencies.readProjectJson).toBeInstanceOf(Function)
  })

  it('readProjectJson', () => {
    expect(dependencies.readProjectJson().name).toMatchSnapshot()
  })

  it('has a shouldInstall method', () => {
    expect(dependencies.shouldInstall).toBeInstanceOf(Function)
  })

  it('has a install method', () => {
    expect(dependencies.install).toBeInstanceOf(Function)
  })
})
