import {Bud} from '../bud'

export class Extension {
  [key: string]: any

  public get app(): Bud {
    return this._app()
  }

  public logger?: Bud['logger']['instance']

  public constructor(public _app: () => Bud) {}
}
