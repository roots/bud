import {describe, expect, it, vi} from 'vitest'

import Sage from './index.js'

const setup = async (spyCallback?) => {
  const bud = await import(`@repo/test-kit/bud`).then(
    async ({factory}) => await factory(),
  )

  if (spyCallback) {
    await spyCallback(bud)
  }

  const instance = new Sage(bud)
  await instance.register(bud)
  return {bud, instance}
}

describe(`@roots/sage`, () => {
  it(`is registrable`, async () => {
    const {instance} = await setup()
    expect(instance).toBeInstanceOf(Sage)
  })

  it(`has label prop`, async () => {
    const {instance} = await setup()
    expect(instance.label).toBe(`@roots/sage`)
  })

  it(`registers prop: label`, async () => {
    const {instance} = await setup()
    expect(instance.label).toBe(`@roots/sage`)
  })

  it(`has boot prop`, async () => {
    const {instance} = await setup()
    expect(instance.register).toBeInstanceOf(Function)
  })

  it(`sets aliases`, async () => {
    let spy

    await setup(bud => {
      spy = vi.spyOn(bud.hooks, `on`)
    })

    expect(spy).toHaveBeenLastCalledWith(
      `location.@public`,
      expect.any(String),
    )
  })

  it(`sets runtime`, async () => {
    let spy

    await setup(bud => {
      spy = vi.spyOn(bud, `runtime`)
    })

    expect(spy).toHaveBeenCalledWith(`single`)
  })
})
