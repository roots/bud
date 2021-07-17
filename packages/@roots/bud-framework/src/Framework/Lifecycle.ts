import type {Framework} from '.'

export class Lifecycle {
  public static events: string[] = [
    'bootstrap',
    'bootstrapped',
    'register',
    'registered',
    'boot',
    'booted',
  ]

  public static doEvents(app: Framework) {
    const time = (cb, name: string[]) => {
      app.logger.instance.scope(...name).time(name[0])
      cb()
      app.logger.instance.scope(...name).timeEnd(name[0])
    }

    Lifecycle.events.forEach(event => {
      time(
        () =>
          app.services.getKeys().forEach((name: string) => {
            if (!name || !app[name][event]) return
            time(() => app[name][event](app), [name, event])
          }),
        [event],
      )
    })
  }
}
