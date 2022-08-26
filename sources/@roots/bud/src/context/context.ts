/* eslint-disable no-console */
import type {Context as FrameworkContext} from '@roots/bud-framework/config'
import type Conf from 'conf'
import cache from 'conf'

import Args from './args.js'
import BudContext from './bud.js'
import Config from './config.js'
import Env from './env.js'
import Extensions from './extensions.js'
import Services from './services.js'

let processContext: Record<string, FrameworkContext> = {}

export default class Context {
  public data: Conf<FrameworkContext>

  private constructor(basedir: string) {
    this.data = new cache<FrameworkContext>({configName: basedir})
  }

  public static async make(basedir: string): Promise<FrameworkContext> {
    if (processContext[basedir]) return processContext[basedir]

    const instance = new Context(basedir)

    instance.data.set(`basedir`, basedir)
    instance.data.set(`args`, new Args(basedir).data)
    instance.data.set(`env`, new Env(basedir).data)

    if (instance.data.get(`args.clearContextCache`)) instance.data.clear()

    const config: Config = await new Config().find(
      instance.data.get(`basedir`),
    )

    config.data[`package.json`] &&
      instance.data.set(`manifest`, config.data[`package.json`].module)

    if (
      instance.data.has(`bud`) &&
      instance.data.has(`manifest`) &&
      !instance.data.get(`args.clearContextCache`) &&
      instance.data.get(`args.contextCache`)
    ) {
      processContext[basedir] = {
        ...instance.data.store,
        config: config.data,
      }
      return processContext[basedir]
    }

    await new BudContext().find().then(({data}) => {
      instance.data.set(`bud`, data)
    })

    await new Extensions(instance.data.get(`manifest`))
      .find()
      .then(({data}) => {
        instance.data.set(`extensions`, data)
      })

    instance.data.set(`services`, Services.data)

    processContext[basedir] = {...instance.data.store, config: config.data}

    return processContext[basedir]
  }
}
