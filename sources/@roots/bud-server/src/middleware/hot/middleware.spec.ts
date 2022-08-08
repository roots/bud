import {jest} from '@jest/globals'
import {Bud, factory} from '@repo/test-kit/bud'

import hotMiddleware, {collectCompilations} from './middleware'

jest.mock('@roots/bud-compiler')

export default () => {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory({mode: 'development'})
  })

  afterAll(async () => bud.close())

  it('should be a function', () => {
    expect(hotMiddleware).toBeDefined()
  })

  it('should return expected output', () => {
    try {
      expect(hotMiddleware(bud)).toBeInstanceOf(Function)
    } catch (error) {}
  })

  describe('collectCompilations', () => {
    it('should be a function', () => {
      expect(collectCompilations).toBeInstanceOf(Function)
    })
  })
}
