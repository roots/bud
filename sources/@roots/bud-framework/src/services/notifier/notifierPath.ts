import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

export const notifierPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  `..`, // services
  `..`, // src
  `..`, // bud-framework
  `vendor`,
  `mac.no-index`,
  `roots-notifier.app`,
  `Contents`,
  `MacOS`,
  `roots-notifier`,
)
