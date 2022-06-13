import {bind} from 'helpful-decorators'
import type {StatsError} from 'webpack'

export default class BudError {
  public file: string
  public source: string
  public message: string
  public line: number = 0
  public column: number = 0
  public type: 'syntax' | 'export' = null

  public constructor(public statsError?: StatsError) {
    if (!statsError) return

    this.source =
      statsError?.moduleName?.split('!').pop() ??
      statsError?.moduleIdentifier?.split('!').pop() ??
      null
    this.setFile(this.source)
    this.message = statsError?.message ?? null
  }

  @bind
  public hasType() {
    return typeof this.type === 'string'
  }
  @bind
  public getType(): this['type'] {
    return this.type
  }
  @bind
  public setType(type: this['type']) {
    this.type = type
  }

  @bind
  public getFile(): string {
    return this.file
  }
  @bind
  public setFile(file: string | ((file: string) => string)): this {
    this.file = typeof file === 'function' ? file(this.file ?? '') : file

    return this
  }
  @bind
  public hasFile() {
    return typeof this.file === 'string'
  }

  @bind
  public getMessage(): string {
    return this.message
  }
  @bind
  public setMessage(
    message: string | ((message: string) => string),
  ): this {
    this.message =
      typeof message === 'function' ? message(this.message ?? '') : message

    return this
  }
  @bind
  public hasMessage() {
    return typeof this.message === 'string'
  }

  @bind
  public getLine(): number {
    return this.line
  }
  @bind
  public setLine(line: number | string): this {
    this.line = typeof line === 'string' ? Number.parseInt(line) : line

    return this
  }
  @bind
  public hasLine() {
    return this.line !== 0
  }

  @bind
  public getColumn(): number {
    return this.column
  }
  @bind
  public setColumn(column: number | string): this {
    this.column =
      typeof column === 'string' ? Number.parseInt(column) : column

    return this
  }
  @bind
  public hasColumn() {
    return this.column !== 0
  }
}
