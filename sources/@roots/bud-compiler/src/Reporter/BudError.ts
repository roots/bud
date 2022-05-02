import {StatsError} from 'webpack'

export default class BudError {
  public _file: string
  public get file(): string {
    return this._file
  }
  public set file(file: string) {
    this._file = file
  }
  public source: string
  public message: string
  public line: number = 0
  public column: number = 0
  public type: 'syntax' | 'export' = null

  public constructor(public statsError: StatsError) {
    this.source =
      statsError?.moduleName?.split('!').pop() ??
      statsError?.moduleIdentifier?.split('!').pop() ??
      null
    this.file = this.source
    this.message = statsError?.message ?? null
  }

  public getType(): this['type'] {
    return this.type
  }
  public setType(type: this['type']) {
    this.type = type
  }

  public getFile(): string {
    return this.file
  }
  public setFile(file: string): this {
    this.file = file
    return this
  }

  public getMessage(): string {
    return this.message
  }
  public setMessage(message: string): this {
    this.message = message
    return this
  }

  public getLine(): number {
    return this.line
  }
  public setLine(line: number | string): this {
    this.line = typeof line === 'string' ? Number.parseInt(line) : line
    return this
  }

  public getColumn(): number {
    return this.column
  }
  public setColumn(column: number | string): this {
    this.column =
      typeof column === 'string' ? Number.parseInt(column) : column
    return this
  }
}
