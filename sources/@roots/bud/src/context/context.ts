import type {Config as Options} from '@roots/bud-framework'
import {get, set} from 'lodash-es'

import Args from './args.js'
import BudContext from './bud.js'
import Config from './config.js'
import Env from './env.js'
import Extensions from './extensions.js'
import Manifest from './manifest.js'
import Services from './services.js'

let cache: Record<string, Context> = {}

export default class Context {
  public data: Options.Context = {} as Options.Context

  public get<K extends keyof Options.Context & string>(
    key: K,
  ): Options.Context[K] {
    return get(this.data, key)
  }

  public set<K extends keyof Options.Context & string>(
    key: K,
    value: Options.Context[K],
  ) {
    set(this.data, key, value)
  }

  private constructor() {}

  public static async make(basedir: string): Promise<Context> {
    if (cache[basedir]) return cache[basedir]

    const instance = new Context()

    instance.set(`args`, new Args().data)
    instance.set(`basedir`, basedir)
    instance.set(`env`, new Env(basedir).data)

    await new Config().find(basedir).then(({data}) => {
      instance.set(`config`, data)
    })
    await new BudContext().find().then(({data}) => {
      instance.set(`bud`, data)
    })
    await new Manifest(instance.get(`config`)).read().then(({data}) => {
      instance.set(`manifest`, data)
      instance.set(`label`, data.name)
    })
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
