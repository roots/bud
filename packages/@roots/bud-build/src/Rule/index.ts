import {boundMethod as bind} from 'autobind-decorator'
import {isFunction} from 'lodash'

import type {
  Framework,
  Rule as Contract,
  Item,
} from '@roots/bud-framework'

class Rule implements Contract {
  public test: Contract.TestFn

  public use: Contract.UseFn

  public exclude: Contract.ExcludeFn

  public type: Contract.TypeFn

  public parser: Contract.ParserFn

  public generator: any

  public constructor({
    test,
    use = null,
    exclude = null,
    type = null,
    parser = null,
    generator = null,
  }: Contract.Options) {
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
  public getParser(app: Framework): Contract.Parser {
    return this.parser ? this.parser(app) : null
  }

  @bind
  public setParser(parser: Contract.ParserFn): void {
    this.parser = isFunction(parser) ? parser : () => parser
  }

  @bind
  public getUse(app: Framework): Item[] {
    return this.use ? this.use(app) : null
  }

  @bind
  public setUse(use: Contract.UseFn | Item[]): void {
    this.use = isFunction(use) ? use : () => use
  }

  @bind
  public getExclude(app: Framework): Contract.Output['exclude'] {
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
    const output: Contract.Output = {
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
