import {factory, Framework} from '@roots/bud'
import * as BudEmotion from '@roots/bud-emotion'

describe('@roots/bud-emotion', () => {
  describe('settings', () => {
    let bud: Framework = null

    beforeAll(async () => {
      bud = await factory({config: {ci: true, log: false}})
    })

    afterAll(done => {
      bud.close(done)
    })

    it('has name prop', () => {
      expect(BudEmotion.name).toBe('@roots/bud-emotion')
    })
  })
})
