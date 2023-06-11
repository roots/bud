import type {App, AppName, OpenAppOptions, Options} from 'open'

import open from 'open'
import openEditor from 'open-editor'

interface SourceFile {
  column?: number
  file: string
  line?: number
}

interface ErrorWithSourceFile extends Error {
  file: string
}

export {open, openEditor}
export type {
  App,
  AppName,
  ErrorWithSourceFile,
  OpenAppOptions,
  Options,
  SourceFile,
}
