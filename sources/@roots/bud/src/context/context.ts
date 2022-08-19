import type {Config as Options} from '@roots/bud-framework'
import {get, set} from 'lodash-es'

import BudContext from './bud.js'
import Config from './config.js'
import Env from './env.js'
import Extensions from './extensions.js'
import Manifest from './manifest.js'
import Services from './services.js'

let cache: Record<string, Context> = {}

export default class Context {
  public data: Partial<Options.Context> = {
    args: {},
  }

  public get(key: string): any {
    return get(this.data, key)
  }

  public set(key: string, value: any) {
    set(this.data, key, value)
  }

  private constructor() {}

  public static async make(basedir: string): Promise<Context> {
    if (cache[basedir]) return cache[basedir]

    const instance = new Context()

    instance.set(`basedir`, basedir)

    await new BudContext().find().then(({data}) => {
      instance.set(`bud`, data)
    })

    instance.set(`env`, new Env(basedir).data)

    await new Config().find(basedir).then(({data}) => {
      instance.set(`config`, data)
    })

    const manifest = await new Manifest(instance.get(`config`)).read()
    instance.set(`manifest`, manifest.data)
    instance.set(`label`, instance.get(`manifest.name`))

    await new Extensions(instance.get(`manifest`))
      .find()
      .then(({data}) => {
        instance.set(`extensions`, data)
      })

    instance.set(`services`, Services.data)

    cache[basedir] = instance

    return instance
  }
}
