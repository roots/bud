/* eslint-disable no-console */
import {Builtins, Cli} from 'clipanion'

let instance: Cli

export const get = (label: string, version: string) => {
  if (instance) return instance

  instance = new Cli({
    binaryLabel: label,
    binaryName: label,
    binaryVersion: version,
    enableCapture: false,
    enableColors: true,
  })

  return instance
}

export {Builtins, Cli}