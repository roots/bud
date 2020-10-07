import {Configuration} from 'webpack'

export const exprContextCritical: Configuration['module']['exprContextCritical'] = true

export const exprContextRecursive: Configuration['module']['exprContextRecursive'] = true

export const exprContextRequest: Configuration['module']['exprContextRequest'] =
  '.'

export const unknownContextCritical: Configuration['module']['unknownContextCritical'] = true

export const unknownContextRecursive: Configuration['module']['unknownContextRecursive'] = true

export const unknownContextRequest: Configuration['module']['unknownContextRequest'] =
  '.'

export const wrappedContextCritical: Configuration['module']['wrappedContextCritical'] = false

export const wrappedContextRecursive: Configuration['module']['wrappedContextRecursive'] = true

export const wrappedContextRegExp: Configuration['module']['wrappedContextRegExp'] = /.*/

export const strictExportPresence: Configuration['module']['exprContextCritical'] = false

export const rules: Configuration['module']['rules'] = []

// export const exprContextRegExp = null
// export const unknownContextRegExp = null
