import {factory} from '@repo/test-kit'
import {beforeEach, describe, expect, it} from 'vitest'
import {Console} from '../src/console.js'

describe(`ConsoleBuffer`, () => {
  let bud: any
  let instance: Console

  beforeEach(async () => {
    bud = await factory()
    instance = new Console(() => bud as any)
  })

  it(`should not patch the instance in ci`, async () => {
    bud.context.ci = true

    await instance.register(bud)
    expect(instance.restore).not.toBeDefined()
  })

  it(`should store instance.log to console.queue`, async () => {
    await instance.register(bud)

    console.log(`log-test`)
    console.info(`info-test`)
    console.error(`error-test`)
    console.warn(`warn-test`)

    expect(instance.queue).toMatchSnapshot()
  })
})
