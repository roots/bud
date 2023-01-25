import type { LoaderContext } from "webpack"

export interface repository {
  [key: string]: {
    pattern: RegExp,
    extension: `.${string}`,
    loader: string,
  }
}

export const repository: repository = {
  css: {
    pattern: /@css([\s\S]*?)@endcss/,
    extension: `.css`,
    loader: require.resolve(`./css.cjs`),
  },
  scss: {
    pattern: /@scss([\s\S]*?)@endscss/,
    extension: `.scss`,
    loader: require.resolve(`./scss.cjs`),
  },
  js: {
    pattern: /@js([\s\S]*?)@endjs/,
    extension: `.js`,
    loader: require.resolve(`./js.cjs`),
  },
  ts: {
    pattern: /@ts([\s\S]*?)@endts/,
    extension: `.ts`,
    loader: require.resolve(`./ts.cjs`),
  },
  vue: {
    pattern: /@vue([\s\S]*?)@endvue/,
    extension: `.vue`,
    loader: require.resolve(`./vue.cjs`),
  },
}

export const make = function <K extends keyof typeof repository>(
  this: LoaderContext<any>,
  entry: typeof repository[K]
) {
  return `import ${JSON.stringify(
    this.utils.contextify(
      this.context || this.rootContext,
      `${this.resource}${entry.extension}!=!${entry.loader}!${this.remainingRequest}`,
    ),
  )};`
}
