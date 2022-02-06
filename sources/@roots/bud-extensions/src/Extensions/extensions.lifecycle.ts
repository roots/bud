import {bind} from '@roots/bud-support'

import {Controller} from '../Controller/controller.service'

/**
 * Intersection of {@link Extension.Module} and {@link Controller}
 * property/method keys
 *
 * @public
 */
export type ControllerModuleMethod = 'api' | 'boot' | 'mixin' | 'register'

/**
 * Processes lifecycle events for an array of controllers
 *
 * @public
 */
export interface Lifecycle {
  /**
   * Execute extension lifecycle for an array of {@link Controller} instances
   *
   * @public
   * @decorator `@bind`
   */
  run(controllers: Record<string, Controller>)

  /**
   * Process {@link Controller} lifecycle stages in parallel
   *
   * @public
   * @decorator `@bind`
   */
  pipe(
    fn: ControllerModuleMethod,
  ): [
    (
      promised: Promise<Array<Controller>>,
      controller: Controller,
    ) => Promise<Array<Controller>>,
    null,
  ]
}

export class Lifecycle {
  @bind
  public async run(controllers: Record<string, Controller>) {
    const instances = Object.values(controllers)

    await instances.reduce(...this.pipe('api'))
    await instances.reduce(...this.pipe('mixin'))
    await instances.reduce(...this.pipe('register'))
    await instances.reduce(...this.pipe('boot'))

    return controllers
  }

  @bind
  public pipe(
    fn: ControllerModuleMethod,
  ): [
    (
      promised: Promise<Array<Controller>>,
      controller: Controller,
    ) => Promise<Array<Controller>>,
    null,
  ] {
    return [
      async (
        promised: Promise<Array<Controller>>,
        controller: Controller,
      ) => {
        const controllers = await promised
        controller = await controller[fn]()
        return [...(controllers ?? []), controller]
      },
      null,
    ]
  }
}
