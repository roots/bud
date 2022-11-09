import type {Bud} from '@roots/bud-framework'
import nodeNotifier from 'node-notifier'
import {beforeEach, describe, expect, it, vi} from 'vitest'

import Notifier from './index.js'

const mockStatsReturn = {
  errors: [],
  warnings: [],
  errorsCount: 1,
  warningsCount: 1,
  children: [
    {
      errorsCount: 0,
      warningsCount: 1,
    },
  ],
}

describe(`notifier`, () => {
  let notifier
  let bud: Bud

  beforeEach(() => {
    bud = {
      context: {
        args: {
          browser: true,
          editor: true,
          notify: true,
        },
      },
      compiler: {
        stats: {
          toJson: vi.fn(() => mockStatsReturn),
        },
      },
      info: vi.fn(() => null),
      error: vi.fn(() => null),
      warn: vi.fn(() => null),
      isDevelopment: true,
      hooks: {
        filter: vi.fn(() => ({
          origin: `0.0.0.0`,
        })),
      },
      env: {
        has: vi.fn(() => true),
        get: vi.fn(() => `MOCK_RETURN`),
      },
      label: `MOCK_LABEL`,
    } as unknown as Bud

    notifier = new Notifier(bud)
  })

  it(`should be an instance of Notifier`, () => {
    expect(notifier).toBeInstanceOf(Notifier)
  })

  it(`should have a notification center prop that is an instance of NotificationCenter`, () => {
    expect(notifier.notificationCenter).toBeInstanceOf(
      nodeNotifier.NotificationCenter,
    )
  })

  it(`should have a jsonStats prop sourced from compiler`, () => {
    expect(notifier.jsonStats).toBe(mockStatsReturn)
  })

  it(`should return empty object when jsonStats prop sourced from compiler is undefined`, () => {
    bud.compiler.stats = vi.fn(() => undefined)
    expect(notifier.jsonStats).toEqual({})
  })

  it(`should call bud.info`, async () => {
    await notifier.notify()
    expect(bud.info).toHaveBeenCalledTimes(1)
  })

  it(`should notify on errors`, async () => {
    expect(notifier.message).toBe(`Compiled with errors`)
  })

  it(`should notify on warnings`, async () => {
    bud.compiler.stats.toJson = vi.fn(() => ({
      errorsCount: 0,
      warningsCount: 2,
      children: [],
    }))
    expect(notifier.message).toBe(`Compiled with warnings`)
  })

  it(`should notify on successful builds`, async () => {
    bud.compiler.stats.toJson = vi.fn(() => ({
      errorsCount: 0,
      warningsCount: 0,
      children: [],
    }))
    expect(notifier.message).toBe(`Compiled without errors`)
  })

  it(`should call openBrowser`, async () => {
    const openBrowser = vi.spyOn(notifier, `openBrowser`)
    await notifier.notify()
    expect(openBrowser).toHaveBeenCalledTimes(1)
  })

  it(`should call openEditor`, async () => {
    const openEditor = vi.spyOn(notifier, `openEditor`)
    await notifier.notify()
    expect(openEditor).toHaveBeenCalledTimes(1)
  })

  it(`should have accessible "group" prop`, async () => {
    expect(notifier.group).toBe(`MOCK_LABEL`)
  })

  it(`should call notificationCenter.notify`, async () => {
    const notificationCenterNotifyMock = vi.fn()
    notifier.notificationCenter = {
      notify: notificationCenterNotifyMock,
    }

    await notifier.notify()
    expect(notificationCenterNotifyMock).toBeCalledTimes(1)
  })
})
