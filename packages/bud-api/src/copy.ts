export function copy<T>(
  from,
  options = {
    to: null,
    context: null,
    noErrorOnMissing: true,
    globOptions: {
      ignore: '.*',
    },
  },
): T {
  this.extensions.mutate(
    `copy-webpack-plugin.patterns`,
    patterns => [
      ...patterns,
      {
        from,
        to: options.to ?? this.dist(),
        context: options.context ?? this.src(),
        globOptions: options.globOptions,
        noErrorOnMissing: options.noErrorOnMissing ?? true,
      },
    ],
  )

  return this
}
