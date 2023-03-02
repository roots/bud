import {Bud, Extension} from '@roots/bud-framework'
import {bind, label, when} from '@roots/bud-framework/extension/decorators'
import stripAnsi from '@roots/bud-support/strip-ansi'
import type {MultiStats} from '@roots/bud-support/webpack'

/**
 * Persistent cache fix for eslint
 */
@label(`@roots/bud-eslint/cache-fix`)
@when(
  bud =>
    bud.eslint.enabled &&
    bud.cache.type === `filesystem` &&
    bud.cache.enabled,
)
export class BudEslintCacheFix extends Extension {
  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    if (await bud.fs.exists(bud.path(`@storage`, `eslint.md`))) {
      this.logger.warn(
        `Errors or warnings found while using eslint with filesystem caching.`,
        `In order to guarantee linting results are accurate, defaulting to \`memory\` cache.`,
        `This will negatively impact build performance until the errors or warnings are resolved.`,
        `To disable this behavior call \`bud.eslint.cacheFix.disable()\` (or \`bud.eslint.disable()\` if you don't want to use eslint).`,
      )
      bud.cache.type = `memory`
      await bud.fs.remove(bud.path(`@storage`, `eslint.md`))
    }

    bud.hooks.action(`compiler.error`, this.compilerError)
    bud.hooks.action(`compiler.stats`, this.compilerStats)
  }

  @bind
  public async compilerError(error: Error) {
    if (!error) return
    await this.app.fs.write(
      this.app.path(`@storage`, `eslint.md`),
      error.message,
    )
  }

  @bind
  public async compilerStats(stats: MultiStats) {
    if (!stats.hasWarnings() && !stats.hasErrors()) return

    const data = stats.toJson()

    await this.app.fs.write(
      this.app.path(`@storage`, `eslint.md`),
      [
        `# Stats`,
        ``,
        `## ${this.app.label}\n`,
        ``,
        `### Errors`,
        ...(data.errors?.map(e => e.message) ?? [`none`]),
        ``,
        `### Warnings`,
        ...(data.warnings?.map(e => e.message) ?? [`none`]),
        ``,
        ...(data.children
          ?.filter(c => c.warnings || c.errors)
          ?.reduce(
            (
              acc: Array<string>,
              {errors, errorsCount, warnings, warningsCount, name},
              i,
            ): Array<string> => {
              if (i === 0) acc.push(`## ${name} (child compilation)`, ``)
              if (errorsCount)
                acc.push(`### Errors`, ...errors.map(e => e.message))
              if (warningsCount)
                acc.push(`### Warnings`, ...warnings.map(w => w.message))
              return acc
            },
            [],
          ) ?? []),
      ]
        .map(stripAnsi)
        .join(`\n`),
    )
  }
}
