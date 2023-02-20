import type {App, AppName, OpenAppOptions, Options} from 'open'
import open from 'open'
import openEditor from 'open-editor'

interface SourceFile {
  file: string
  line?: number
  column?: number
}

interface ErrorWithSourceFile extends Error {
  file: string
}

export {open, openEditor}
export type {App, Options, AppName, OpenAppOptions, SourceFile, ErrorWithSourceFile}
