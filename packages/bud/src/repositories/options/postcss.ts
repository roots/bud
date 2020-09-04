const postcss = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: {
    autoprefixer: require('autoprefixer'),
  },
}

export {postcss as default}
