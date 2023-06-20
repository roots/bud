export const useCompilationColor = (
  compilation: {
    errorsCount?: number
    warningsCount?: number
  },
  successColor: string = `green`,
) => {
  if (!compilation) return `dim`
  if (compilation.errorsCount > 0) return `red`
  if (compilation.warningsCount > 0) return `yellow`
  return successColor
}
