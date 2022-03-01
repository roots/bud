import {Framework} from '@roots/bud-framework'
import {bind, humanReadable, NodeNotifier} from '@roots/bud-support'
import {dirname, resolve} from 'path'

/**
 * MacOS binary
 */
const MACOS_NOTIFIER_PATH = resolve(
  __dirname,
  '../../../vendor/roots-notifier.app/Contents/MacOS/roots-notifier',
)

export class Notifier {
  public instance: NodeNotifier.NotificationCenter

  public constructor(public app: Framework) {
    this.instance = new NodeNotifier.NotificationCenter({
      customPath: MACOS_NOTIFIER_PATH,
    })

    this.app.hooks.action('event.compiler.stats', this.notify)
  }

  @bind
  public async notify(app: Framework) {
    const summary = app.compiler.stats.children?.reduce(
      (summary, compilation) => {
        return {
          errors: summary.errors + (compilation.errorsCount ?? 0),
          warnings: summary.warnings + (compilation.warningsCount ?? 0),
          assets: summary.assets + (compilation.assets?.length ?? 0),
          time: summary.time + (compilation.time ?? 0),
        }
      },
      {
        errors: app.compiler.stats.errorsCount ?? 0,
        warnings: app.compiler.stats.warningsCount ?? 0,
        assets: 0,
        time: 0,
      },
    )

    const group = dirname(this.app.path('project')).split('/').pop()
    const title =
      !summary?.errors && !summary?.warnings
        ? 'Compilation success'
        : summary?.errors
        ? 'Compilation failed'
        : 'Compiled with warnings'

    this.instance.notify({
      title,
      group,
      message: `Done in ${humanReadable.durationFormatter()(
        summary?.time,
      )}.`,
      contentImage: resolve(__dirname, '../../../assets/bud-icon.jpg'),
    })
  }
}
