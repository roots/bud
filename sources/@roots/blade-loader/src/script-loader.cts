import type {LoaderDefinitionFunction} from 'webpack'

const cssLoader = require.resolve(`./loaders/css.cjs`)
const scssLoader = require.resolve(`./loaders/scss.cjs`)
const jsLoader = require.resolve(`./loaders/js.cjs`)
const tsLoader = require.resolve(`./loaders/ts.cjs`)
const vueLoader = require.resolve(`./loaders/vue.cjs`)

const loader: LoaderDefinitionFunction<any> = function (source) {
  if (!this.resourcePath.match(/\.php$/)) return source

  let result: Array<string> = []

  const css = [...(source.match(/@css([\s\S]*?)@endcss/g) ?? [])]
  if (css.length) {
    result.push(
      `import ${JSON.stringify(
        this.utils.contextify(
          this.context || this.rootContext,
          `${this.resource}.css!=!${cssLoader}!${this.remainingRequest}`,
        ),
      )};`,
    )
  }

  const scss = [...(source.match(/@scss([\s\S]*?)@endscss/g) ?? [])]
  if (scss.length) {
    result.push(
      `import ${JSON.stringify(
        this.utils.contextify(
          this.context || this.rootContext,
          `${this.resource}.scss!=!${scssLoader}!${this.remainingRequest}`,
        ),
      )};`,
    )
  }

  const js = source.match(/@js([\s\S]*?)@endjs/g)
  if (js.length) {
    result.push(
      `import ${JSON.stringify(
        this.utils.contextify(
          this.context || this.rootContext,
          `${this.resource}.js!=!${jsLoader}!${this.remainingRequest}`,
        ),
      )};`,
    )
  }

  const ts = [...(source.match(/@ts([\s\S]*?)@endts/g) ?? [])]
  if (ts.length) {
    result.push(
      `import ${JSON.stringify(
        this.utils.contextify(
          this.context || this.rootContext,
          `${this.resource}.ts!=!${tsLoader}!${this.remainingRequest}`,
        ),
      )};`,
    )
  }

  const vue = [...(source.match(/@vue([\s\S]*?)@endvue/g) ?? [])]
  if (vue.length) {
    result.push(
      `import ${JSON.stringify(
        this.utils.contextify(
          this.context || this.rootContext,
          `${this.resource}.vue!=!${vueLoader}!${this.remainingRequest}`,
        ),
      )};`,
    )
  }

  return result.filter(Boolean).join(`\n`)
}

export default loader
