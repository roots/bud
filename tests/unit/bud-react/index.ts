import {factory, Framework} from '@roots/bud'
import BudReact from '@roots/bud-react'

describe('@roots/bud-react', () => {
  let bud: Framework = null

  let mock = {
    devDependencies: {
      '@roots/bud': 'workspace:packages/@roots/bud',
      '@roots/bud-babel': 'workspace:packages/@roots/bud-babel',
      '@roots/bud-cli': 'workspace:packages/@roots/bud-cli',
      '@roots/bud-react': 'workspace:packages/@roots/bud-react',
    },
    dependencies: {
      react: '^17.0.2',
      'react-dom': '^17.0.2',
    },
  }

  beforeAll(async () => {
    bud = await factory()
  })

  afterAll(done => {
    bud.close(done)
  })

  it('has name prop', () => {
    expect(BudReact.name).toBe('@roots/bud-react')
  })

  test.todo('react-refresh')
  test.todo('react')
  test.todo('register')
  test.todo('boot')
})
