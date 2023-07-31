import isNumber from '@roots/bud-support/lodash/isNumber'

export const useCompilationColor = (
  compilation?: {
    errorsCount?: number
    warningsCount?: number
  },
  successColor: string = `green`,
) => {
  if (!compilation) return `dim`

  if (isNumber(compilation.errorsCount) && compilation.errorsCount > 0)
    return `red`

  if (isNumber(compilation.warningsCount) && compilation.warningsCount > 0)
    return `yellow`

  return successColor
}
