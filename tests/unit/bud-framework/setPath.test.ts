import {Bud, factory} from '@repo/test-kit/bud'

const NEW_PATH = `foo`

describe('bud.setPath', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('is a function', () => {
    expect(bud.setPath).toBeInstanceOf(Function)
  })

  it('returns Bud', () => {
    expect(bud.setPath('@src', NEW_PATH)).toBeInstanceOf(Bud)
  })

  it('sets a path', () => {
    bud.setPath('@src', NEW_PATH)
    expect(bud.path('@src')).toContain(NEW_PATH)
  })

  it('sets a path with @ shortcut', () => {
    bud.setPath('@src', NEW_PATH)
    expect(bud.path('@src')).toContain(NEW_PATH)
  })

  it('sets multiple paths', () => {
    const value = {
      src: NEW_PATH,
      '@dist': 'bar',
    }

    bud.setPath(value)

    expect(bud.path('@src')).toEqual(bud.path(value.src))
    expect(bud.path('@dist')).toEqual(bud.path(value['@dist']))
  })
})
