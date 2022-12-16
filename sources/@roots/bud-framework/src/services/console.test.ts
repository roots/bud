import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {Bud} from '@roots/bud'
import ConsoleBuffer from './console.js'

describe(`ConsoleBuffer`, () => {
  let bud: Bud
  let consoleBuffer: ConsoleBuffer

  beforeEach(async () => {
    bud = await factory({mode: `production`})
    consoleBuffer = new ConsoleBuffer(() => bud)
  })

  it(`should not patch the console in ci`, async () => {
    bud.context.args.ci = true

    await consoleBuffer.init(bud)
    expect(consoleBuffer.restore).not.toBeDefined()
  })

  it(`should store console.log to consoleBuffer.messages`, async () => {
    await consoleBuffer.init(bud)

    console.log(`log-test`)
    console.info(`info-test`)
    console.error(`error-test`)
    console.warn(`warn-test`)

    expect(consoleBuffer.messages).toMatchSnapshot()
  })
})
