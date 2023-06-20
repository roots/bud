export const useCompilationColor = (
  compilation: {
    errorsCount?: number
    warningsCount?: number
  },
  successColor: string = `green`,
) =>
  compilation.errorsCount > 0
    ? `red`
    : compilation.warningsCount > 0
    ? `yellow`
    : successColor
