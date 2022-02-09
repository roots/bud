import {Framework} from '@roots/bud-framework'
import {bind, humanReadable} from '@roots/bud-support'
import {dirname, resolve} from 'path'
import {StatsCompilation} from 'webpack'

import {NodeNotifier} from '../cli.dependencies'

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

    this.app.hooks.on('event.compiler.stats', this.notify)
  }

  @bind
  public async notify(stats: StatsCompilation) {
    const summary = stats.children?.reduce(
      (summary, compilation) => {
        return {
          errors: summary.errors + (compilation.errorsCount ?? 0),
          warnings: summary.warnings + (compilation.warningsCount ?? 0),
          assets: summary.assets + (compilation.assets?.length ?? 0),
          time: summary.time + (compilation.time ?? 0),
        }
      },
      {
        errors: stats.errorsCount ?? 0,
        warnings: stats.warningsCount ?? 0,
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

    return stats
  }
}
