import {config, factory, Framework} from '@roots/bud'
import {readJsonSync} from 'fs-extra'

describe('bud.discovery', function () {
  let bud: Framework
  let json = readJsonSync(process.cwd().concat('/package.json'))

  beforeAll(() => {
    bud = factory({config: {...config, ci: true}})
  })

  afterAll(done => {
    bud.close(done)
  })

  it('contains project level package.json data', () => {
    expect(bud.discovery.get('name')).toEqual(json.name)
    expect(bud.discovery.get('devDependencies')).toEqual(
      json.devDependencies,
    )
  })
})
