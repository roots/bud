import webpack from 'webpack'

export const exprContextCritical = true
export const exprContextRecursive = true
export const exprContextRequest = '.'
export const unknownContextCritical = true
export const unknownContextRecursive = true
export const unknownContextRequest = '.'
export const wrappedContextCritical = false
export const wrappedContextRecursive = true
export const wrappedContextRegExp = /.*/
export const strictExportPresence = false
export const rules: webpack.RuleSetRule[] = []

// export const exprContextRegExp = null
// export const unknownContextRegExp = null
