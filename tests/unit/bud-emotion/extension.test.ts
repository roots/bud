import {Bud, factory} from '@repo/test-kit/bud'
import BudEmotion from '@roots/bud-emotion'

describe('@roots/bud-emotion', () => {
  let bud: Bud
  let impl: BudEmotion

  beforeAll(async () => {
    bud = await factory()
    impl = new BudEmotion(bud)
  })

  it('has name prop', () => {
    expect(impl.label).toBe('@roots/bud-emotion')
  })
})
