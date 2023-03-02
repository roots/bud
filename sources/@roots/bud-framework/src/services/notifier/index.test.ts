import {Bud, factory} from '@repo/test-kit/bud'
import nodeNotifier from 'node-notifier'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Notifier from './index.js'

describe(`notifier`, () => {
  let notifier: Notifier
  let bud: Bud

  beforeEach(async () => {
    vi.mock('open', () => ({default: vi.fn()}))
    vi.mock('open-editor', () => ({default: vi.fn()}))

    bud = await factory({args: {notify: true}})
    notifier = new Notifier(() => bud)
    await notifier.boot(bud)
    notifier.notify = vi.fn()
  })

  it(`should be an instance of Notifier`, () => {
    expect(notifier).toBeInstanceOf(Notifier)
  })

  it(`should have a notification center prop that is an instance of NotificationCenter`, () => {
    expect(notifier.notificationCenter).toBeInstanceOf(
      nodeNotifier.NotificationCenter,
    )
  })
})
