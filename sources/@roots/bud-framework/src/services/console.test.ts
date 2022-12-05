import {factory} from '@repo/test-kit/bud'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import ConsoleBuffer from './console.js'

describe(`ConsoleBuffer`, () => {
  let bud
  let consoleBuffer

  beforeEach(async () => {
    bud = await factory()
    consoleBuffer = new ConsoleBuffer(() => bud)
  })

  it(`should not patch the console in ci`, async () => {
    bud.context.args.ci = true

    await consoleBuffer.init(bud)

    expect(consoleBuffer.restore).not.toBeDefined()
  })

  it(`should store console.log to consoleBuffer.message.stdout`, async () => {
    await consoleBuffer.init(bud)

    console.log(`foo`)
    console.info(`bar`)

    expect(consoleBuffer.messages.stdout).toEqual(
      expect.arrayContaining([`foo`, `bar`]),
    )
  })

  it(`should store console.error to consoleBuffer.message.stderr`, async () => {
    await consoleBuffer.init(bud)

    console.error(`foo`)

    expect(consoleBuffer.messages.stderr).toEqual(
      expect.arrayContaining([`foo`]),
    )
  })
})
