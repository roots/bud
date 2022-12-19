import {factory} from '@repo/test-kit/bud'
import type {Bud} from '@roots/bud-framework'
import nodeNotifier from 'node-notifier'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import {Notifier} from './index.js'

describe(`notifier`, () => {
  let notifier: Notifier
  let bud: Bud

  beforeEach(async () => {
    // @ts-ignore
    Notifier.notifier.notify.get = vi.fn((obj, callback) => {
      callback(null, null, null)
    })
    bud = await factory({
      args: {
        log: false,
      },
    })
    notifier = new Notifier().setBud(bud)
  })

  it(`should be an instance of Notifier`, () => {
    expect(notifier).toBeInstanceOf(Notifier)
  })

  it(`should have a notification center prop that is an instance of NotificationCenter`, () => {
    expect(Notifier.notifier).toBeInstanceOf(
      nodeNotifier.NotificationCenter,
    )
  })

  it(`should have a jsonStats prop sourced from compiler`, () => {
    notifier.setStats({label: `foo`})
    expect(notifier.stats).toEqual(expect.objectContaining({label: `foo`}))
  })

  it(`should return empty object when jsonStats prop sourced from compiler is undefined`, () => {
    bud.compiler.stats = vi.fn(() => undefined)
    expect(notifier.stats).toEqual({})
  })

  it.skip(`should notify on errors`, async () => {
    notifier.setStats({
      errorsCount: 2,
      warningsCount: 2,
      children: [],
    })

    await notifier.compilationNotification()
    expect(notifier.message).toBe(`Successfully compiled`)
  })

  it.skip(`should notify on warnings`, async () => {
    notifier.setStats({
      errorsCount: 2,
      warningsCount: 2,
      children: [],
    })
    expect(notifier.message).toBe(`Compiled with warnings`)
  })

  it.skip(`should notify on successful builds`, async () => {
    bud.compiler.stats = {
      toJson: vi.fn(() => ({
        errorsCount: 0,
        warningsCount: 0,
        children: [],
      })),
    }

    expect(notifier.message).toBe(`Compiled without errors`)
  })

  it(`should call openBrowser`, async () => {
    bud.context.mode = `development`
    bud.context.args = {browser: true}
    const openBrowser = vi.spyOn(notifier, `open`)

    try {
      await notifier.compilationNotification()
    } catch (e) {}
    expect(openBrowser).toHaveBeenCalledTimes(1)
  })

  it(`should have accessible "group" prop`, async () => {
    notifier.setGroup(`MOCK_GROUP`)
    expect(notifier.group).toBe(`MOCK_GROUP`)
  })

  it(`should call notificationCenter.notify`, async () => {
    const notifySpy = vi.spyOn(notifier, `notify`)
    await notifier.compilationNotification()
    expect(notifySpy).toBeCalledTimes(1)
  })
})
