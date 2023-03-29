import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it} from 'vitest'
import ConsoleBuffer from './console.js'

describe(`ConsoleBuffer`, () => {
  let bud: any
  let consoleBuffer: ConsoleBuffer

  beforeEach(async () => {
    bud = await factory()
    consoleBuffer = new ConsoleBuffer(() => bud as any)
  })

  it(`should not patch the console in ci`, async () => {
    if (!bud.isCLI()) throw new Error(`bud.isCLI() returned false`)
    bud.context.args.ci = true

    await consoleBuffer.register(bud)
    expect(consoleBuffer.restore).not.toBeDefined()
  })

  it(`should store console.log to consoleBuffer.queue`, async () => {
    await consoleBuffer.register(bud)

    console.log(`log-test`)
    console.info(`info-test`)
    console.error(`error-test`)
    console.warn(`warn-test`)

    expect(consoleBuffer.queue).toMatchSnapshot()
  })
})
