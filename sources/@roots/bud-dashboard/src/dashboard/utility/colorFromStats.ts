export const colorFromStats = (compilation: {
  errorsCount?: number
  warningsCount?: number
}) =>
  compilation.errorsCount > 0
    ? `red`
    : compilation.warningsCount > 0
    ? `yellow`
    : `green`
