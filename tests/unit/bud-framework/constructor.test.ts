import {factory} from '@roots/bud/factory'

describe(`bud`, () => {
  it(`name options`, async () => {
    const bud = await factory({
      label: `foo`,
      mode: `production`,
    })

    expect(bud.label).toBe(`foo`)
  })
})
