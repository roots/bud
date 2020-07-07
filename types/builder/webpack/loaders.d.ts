/**
 * Webpack loaders
 */
export function loaders({
  features,
  options,
  configs,
}: {
  features: any
  options: any
  configs: any
}): {
  module: {
    strictExportPresence: boolean
    rules: (
      | {
          test: RegExp
          include: any
          exclude: RegExp
          loader: string
          options: any
        }
      | {
          test: RegExp
          use: any
        }
    )[]
  }
}
//# sourceMappingURL=loaders.d.ts.map
