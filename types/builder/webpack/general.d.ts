/**
 * General webpackery.
 */
export function general({
  paths,
  mode,
  features,
  options,
}: {
  paths: any
  mode: any
  features: any
  options: any
}): {
  context: any
  devtool: any
  mode: any
  node: {
    module: string
    dgram: string
    dns: string
    fs: string
    http2: string
    net: string
    tls: string
    child_process: string
  }
  target: any
  watch: any
}
//# sourceMappingURL=general.d.ts.map
