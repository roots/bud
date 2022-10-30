import {describe, expect, it, jest} from '@jest/globals'

import Sage from './index'

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
      spy = jest.spyOn(bud.hooks, `on`)
    })

    expect(spy).toHaveBeenLastCalledWith(
      `location.@views`,
      expect.any(String),
    )
  })

  it(`sets runtime`, async () => {
    let spy

    await setup(bud => {
      spy = jest.spyOn(bud, `runtime`)
    })

    expect(spy).toHaveBeenCalledWith(`single`)
  })
})
