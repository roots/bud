import {Bud, factory, mockProject} from '@repo/test-kit/bud'
import {join} from 'node:path'

describe('bud.path', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('path: is a function', () => {
    expect(bud.path).toBeInstanceOf(Function)
  })

  it('returns projectDir when nothing passed', () => {
    expect(bud.path()).toEqual(mockProject.path)
  })

  it('returns expected project relative path', () => {
    expect(bud.path('./foo')).toEqual(join(mockProject.path, 'foo'))
  })
  it('returns expected multipart path', () => {
    expect(bud.path('./foo', 'bar')).toEqual(
      join(mockProject.path, 'foo', 'bar'),
    )
  })

  it('path: returns src relative path', () => {
    expect(bud.path('@src', 'foo')).toEqual(
      join(mockProject.path, 'src', 'foo'),
    )
  })
})
