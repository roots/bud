import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'

import type {Framework, Build} from '@roots/bud-framework'

class Rule implements Build.Rule {
  public test: Build.Rule.TestFn

  public use: Build.Rule.UseFn

  public exclude: Build.Rule.ExcludeFn

  public type: Build.Rule.TypeFn

  public parser: Build.Rule.ParserFn

  public generator: any

  public constructor({
    test,
    use = null,
    exclude = null,
    type = null,
    parser = null,
    generator = null,
  }: Build.Rule.Options) {
    this.test = isFunction(test) ? test : () => test

    if (use) {
      this.use = isFunction(use) ? use : () => use
    }

    if (exclude) {
      this.exclude = isFunction(exclude)
        ? exclude
        : () => exclude
    }

    if (type) {
      this.type = isFunction(type) ? type : () => type
    }

    if (parser) {
      this.parser = isFunction(parser) ? parser : () => parser
    }

    if (generator) {
      this.generator = isFunction(generator)
        ? generator
        : () => generator
    }
  }

  @bind
  public getTest(app: Framework): RegExp {
    return this.test ? this.test(app) : null
  }

  @bind
  public setTest(
    test: RegExp | ((app: Framework) => RegExp),
  ): void {
    this.test = isFunction(test) ? test : () => test
  }

  @bind
  public getParser(app: Framework): Build.Rule.Parser {
    return this.parser ? this.parser(app) : null
  }

  @bind
  public setParser(parser: Build.Rule.ParserFn): void {
    this.parser = isFunction(parser) ? parser : () => parser
  }

  @bind
  public getUse(app: Framework): Build.Item[] {
    return this.use ? this.use(app) : null
  }

  @bind
  public setUse(use: Build.Rule.UseFn | Build.Item[]): void {
    this.use = isFunction(use) ? use : () => use
  }

  @bind
  public getExclude(
    app: Framework,
  ): Build.Rule.Output['exclude'] {
    return this.exclude ? this.exclude(app) : null
  }

  @bind
  public setExclude(
    exclude: RegExp | ((app: Framework) => RegExp),
  ): void {
    this.exclude = isFunction(exclude) ? exclude : () => exclude
  }

  @bind
  public getType(app: Framework) {
    return this.type ? this.type(app) : null
  }

  @bind
  public setType(type) {
    this.type = isFunction(type) ? type : () => type
  }

  @bind
  public getGenerator(app: Framework) {
    return this.generator ? this.generator(app) : null
  }

  @bind
  public setGenerator(generator) {
    this.generator = isFunction(generator)
      ? generator
      : () => generator
  }

  @bind
  public make(app: Framework) {
    const output: Build.Rule.Output = {
      test: this.test(app),
    }

    if (this.use) {
      output.use = this.use(app).map(item => item.make(app))
    }

    if (this.exclude) {
      output.exclude = this.exclude(app)
    }

    if (this.type) {
      output.type = this.type(app)
    }

    if (this.parser) {
      output.parser = this.parser(app)
    }

    if (this.generator) {
      output.generator = this.generator(app)
    }

    return output
  }
}

export {Rule}
