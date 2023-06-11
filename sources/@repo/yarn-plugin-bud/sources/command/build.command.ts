import {path} from '@repo/constants'
import {CommandClass} from 'clipanion'
import * as fs from 'fs-jetpack'

import {Command} from './base.command'

interface BundleProps {
  source: string
  alias?: Record<string, string>
  format?: `esm` | `cjs`
  external?: Array<string>
  outdir?: string
  outfile?: string
}

export class Build extends Command {
  public static paths = [[`@bud`, `build`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Build packages`,
    examples: [[`build packages`, `yarn @bud build`]],
  }

  public async execute() {
    try {
      await this.promise(
        `Bundling dependencies (pre-build)`,
        `Bundled dependencies (pre-build)`,
        `Failed to bundle dependencies (pre-build)`,
        this.bundle({
          source: `node_modules/@aws-sdk/client-s3/dist-es/index.js`,
          outfile: `sources/@roots/filesystem/vendor/sdk/index.cjs`,
          format: `cjs`,
        }),
      )
    } catch (e) {
      throw e
    }

    try {
      await this.promise(
        `Building from source`,
        `Built from source`,
        `Build failed`,
        this.cli.run([`@bud`, `tsc`, `--force`]),
      )
    } catch (e) {
      throw e
    }

    this.promised.push(
      this.bundle({
        source: `sources/@roots/bud-support/lib/highlight/index.js`,
        outfile: `sources/@roots/bud-support/lib/highlight/index.js`,
        format: `esm`,
      }),
    )

    this.promised.push(
      this.bundle({
        source: `sources/@roots/bud-support/lib/html-loader/index.cjs`,
        outfile: `sources/@roots/bud-support/lib/html-loader/index.cjs`,
        external: [`./runtime/getUrl.js`],
        format: `cjs`,
      }),
      fs.copyAsync(
        path(`node_modules/html-loader/dist/runtime/getUrl.js`),
        path(
          `sources/@roots/bud-support/lib/html-loader/runtime/getUrl.js`,
        ),
        {overwrite: true},
      ),
    )

    this.promised.push(
      this.bundle({
        source: `sources/@roots/bud-support/lib/html-webpack-plugin/index.cjs`,
        outfile: `sources/@roots/bud-support/lib/html-webpack-plugin/index.cjs`,
        external: [`./lib/loader.js`],
        format: `cjs`,
      }),

      fs.copyAsync(
        path(`node_modules/html-webpack-plugin/lib/loader.js`),
        path(
          `sources/@roots/bud-support/lib/html-webpack-plugin/lib/loader.js`,
        ),
        {overwrite: true},
      ),
    )

    try {
      await this.promise(
        `Bundling dependencies (post-build)`,
        `Bundled dependencies (post-build)`,
        `Failed to bundle dependencies (post-build)`,
        Promise.all(this.promised),
      )
    } catch (e) {
      throw e
    }
  }

  public async bundle({
    source,
    alias = {},
    external = [],
    format = `esm`,
    outdir,
    outfile,
  }: BundleProps) {
    return this.cli.run(
      [
        `esbuild`,
        `--bundle`,
        source,
        outfile ? `--outfile=${outfile}` : `--outdir=${outdir}`,
        `--platform=node`,
        `--allow-overwrite`,
        `--minify`,
        `--log-level=warning`,
        `--format=${format}`,
        /**
         * Externals
         */
        `--external:crypto`,
        `--external:module`,
        `--external:node:*`,
        `--external:@roots/*`,
        ...external.map(pkg => `--external:${pkg}`),
        /**
         * Aliases
         */
        `--alias:webpack=@roots/bud-support/webpack`,
        ...Object.entries(alias).map(
          ([key, value]) => `--alias:${key}=${value}`,
        ),
      ].filter(Boolean),
    )
  }
}
