import {bind} from 'helpful-decorators'

export class Dir {
  public constructor(public project: string) {}

  @bind
  public setProject(path: string): this {
    this.project = path

    return this
  }

  @bind
  public async find(): Promise<Dir> {
    if (!this.project)
      throw new Error(`project not accessible: ${this.project}`)

    if (this.project) return this

    return this
  }
}
