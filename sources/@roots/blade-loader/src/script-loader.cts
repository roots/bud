import type {LoaderDefinitionFunction} from 'webpack'

const cssLoader = require.resolve(`./loaders/css.cjs`)
const scssLoader = require.resolve(`./loaders/scss.cjs`)
const jsLoader = require.resolve(`./loaders/js.cjs`)
const tsLoader = require.resolve(`./loaders/ts.cjs`)
const vueLoader = require.resolve(`./loaders/vue.cjs`)

const loader: LoaderDefinitionFunction<any> = function (source) {
  let result: Array<string> = []

  if (source.match(/@css([\s\S]*?)@endcss/g)) {
    result.push(
      `import ${JSON.stringify(
        this.utils.contextify(
          this.context || this.rootContext,
          `${this.resource}.css!=!${cssLoader}!${this.remainingRequest}`,
        ),
      )};`,
    )
  }

  if (source.match(/@scss([\s\S]*?)@endscss/g)) {
    result.push(
      `import ${JSON.stringify(
        this.utils.contextify(
          this.context || this.rootContext,
          `${this.resource}.scss!=!${scssLoader}!${this.remainingRequest}`,
        ),
      )};`,
    )
  }

  if (source.match(/@js([\s\S]*?)@endjs/g)) {
    result.push(
      `import ${JSON.stringify(
        this.utils.contextify(
          this.context || this.rootContext,
          `${this.resource}.js!=!${jsLoader}!${this.remainingRequest}`,
        ),
      )};`,
    )
  }

  if (source.match(/@ts([\s\S]*?)@endts/g)) {
    result.push(
      `import ${JSON.stringify(
        this.utils.contextify(
          this.context || this.rootContext,
          `${this.resource}.ts!=!${tsLoader}!${this.remainingRequest}`,
        ),
      )};`,
    )
  }

  if (source.match(/@vue([\s\S]*?)@endvue/g)) {
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
