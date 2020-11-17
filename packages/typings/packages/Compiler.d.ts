import type {Bud, Webpack} from '.'

/**
 * Compilation callback.
 */
export type Handler = Webpack.Compiler.Handler

/**
 * ProgressPlugin callback.
 */
export type ProgressHandler = Webpack.ProgressPlugin.Handler

export class Contract implements Interface {
  public instance: Webpack.Compiler

  public constructor(bud: Bud.Bud)

  public compile(): void

  public get(): Webpack.Compiler

  public set(compiler: Webpack.Compiler): void

  public run(handler: Handler): void

  public applyPlugins(handler: ProgressHandler): void
}

export interface Interface {
  instance: Webpack.Compiler

  compile(): void

  get(): Webpack.Compiler

  set(compiler: Webpack.Compiler): void

  run(handler: Handler): void

  applyPlugins(handler: ProgressHandler): void
}
