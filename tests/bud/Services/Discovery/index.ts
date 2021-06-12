import {Framework, setupBud, teardownBud} from '../../../util'
import {readJsonSync} from 'fs-extra'

describe('bud.discovery', function () {
  let bud: Framework
  let json = readJsonSync(process.cwd().concat('/package.json'))

  beforeEach(() => {
    bud = setupBud()
  })

  afterEach(() => {
    bud = teardownBud(bud)
  })

  it('contains project level package.json data', () => {
    expect(bud.discovery.get('name')).toEqual(json.name)
    expect(bud.discovery.get('devDependencies')).toEqual(
      json.devDependencies,
    )
  })
})
