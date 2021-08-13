/* eslint-disable @typescript-eslint/explicit-member-accessibility */

/**
 * This is a patched `ink-testing-library` which utilizes the renderer from `@roots/bud-support`
 */

import * as Support from '@roots/bud-support'
import {EventEmitter} from 'events'

/**
 * Unchanged
 */
class Stdout extends EventEmitter {
  get columns() {
    return 100
  }

  readonly frames: string[] = []
  private _lastFrame?: string

  write = (frame: string) => {
    this.frames.push(frame)
    this._lastFrame = frame
  }

  lastFrame = () => {
    return this._lastFrame
  }
}

/**
 * Unchanged
 */
class Stderr extends EventEmitter {
  readonly frames: string[] = []
  private _lastFrame?: string

  write = (frame: string) => {
    this.frames.push(frame)
    this._lastFrame = frame
  }

  lastFrame = () => {
    return this._lastFrame
  }
}

/**
 * Unchanged
 */
class Stdin extends EventEmitter {
  isTTY = true

  write = (data: string) => {
    this.emit('data', data)
  }

  setEncoding() {
    // Do nothing
  }

  setRawMode() {
    // Do nothing
  }

  resume() {
    // Do nothing
  }

  pause() {
    // Do nothing
  }
}

/**
 * Modified: rerender returns @roots/bud-support instance of React
 */
interface Instance {
  rerender: (tree: Support.React.ReactElement) => void
  unmount: () => void
  cleanup: () => void
  stdout: Stdout
  stderr: Stderr
  stdin: Stdin
  frames: string[]
  lastFrame: () => string | undefined
}

/**
 * Modified: instances is an array of @roots/bud-support instances of Ink
 */
const instances: Support.Ink.Instance[] = []

/**
 * Modified use @roots/bud-support ink renderer
 */
export const render = (
  tree: Support.React.ReactElement,
): Instance => {
  const stdout = new Stdout()
  const stderr = new Stderr()
  const stdin = new Stdin()

  const instance = Support.Ink.render(tree, {
    stdout: stdout as any,
    stderr: stderr as any,
    stdin: stdin as any,
    debug: true,
    exitOnCtrlC: false,
    patchConsole: false,
  })

  instances.push(instance)

  return {
    rerender: instance.rerender,
    unmount: instance.unmount,
    cleanup: instance.cleanup,
    stdout,
    stderr,
    stdin,
    frames: stdout.frames,
    lastFrame: stdout.lastFrame,
  }
}

export const cleanup = () => {
  for (const instance of instances) {
    instance.unmount()
    instance.cleanup()
  }
}
