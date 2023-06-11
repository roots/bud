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
        `Bundling vendor entrypoints`,
        `Bundled vendor entrypoints`,
        `Failed to bundle vendor entrypoints`,
        Promise.all([
          /**
           * @aws-sdk/client-s3
           */
          this.bundle({
            source: `node_modules/@aws-sdk/client-s3/dist-es/index.js`,
            outfile: `sources/@roots/filesystem/vendor/sdk/index.cjs`,
            format: `cjs`,
          }),
          /**
           * highlight-js
           */
          this.bundle({
            source: `sources/@roots/bud-support/lib/highlight/index.js`,
            outfile: `sources/@roots/bud-support/vendor/highlight/index.js`,
            format: `esm`,
          }),
          /**
           * html-loader
           */
          this.bundle({
            source: path(`node_modules/html-loader/dist/index.js`),
            outfile: path(
              `sources/@roots/bud-support/vendor/html-loader/index.cjs`,
            ),
            external: [`./runtime/getUrl.js`],
            format: `cjs`,
          }).then(async () => {
            const modulePath = path(
              `sources/@roots/bud-support/vendor/html-loader/index.cjs`,
            )
            const code = await fs.readAsync(modulePath)
            await fs.writeAsync(
              modulePath,
              code.replace(
                /\.\/runtime\/getUrl\.js/g,
                `./runtime/getUrl.cjs`,
              ),
            )
          }),
          /**
           * html-webpack-plugin
           */
          this.bundle({
            source: `node_modules/html-webpack-plugin/index.js`,
            outfile: `sources/@roots/bud-support/vendor/html-webpack-plugin/index.cjs`,
            external: [`./lib/loader.js`],
            format: `cjs`,
          }).then(async () => {
            const outPath = path(
              `sources/@roots/bud-support/vendor/html-webpack-plugin/index.cjs`,
            )
            const code = await fs.readAsync(outPath)
            await fs.writeAsync(
              outPath,
              code.replace(/\.\/lib\/loader\.js/g, `./lib/loader.cjs`),
            )
          }),
          fs.copyAsync(
            path(`node_modules/html-webpack-plugin/lib/loader.js`),
            path(
              `sources/@roots/bud-support/vendor/html-webpack-plugin/lib/loader.cjs`,
            ),
            {overwrite: true},
          ),
          fs.copyAsync(
            path(`node_modules/html-webpack-plugin/typings.d.ts`),
            path(
              `sources/@roots/bud-support/vendor/html-webpack-plugin/index.d.cts`,
            ),
            {overwrite: true},
          ),
        ]),
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
        `--alias:webpack=@roots/bud-support/webpack`,
        `--allow-overwrite`,
        `--bundle`,
        `--external:crypto`,
        `--external:module`,
        `--external:node:*`,
        `--external:@roots/*`,
        `--minify`,
        `--log-level=warning`,
        `--platform=node`,

        ...Object.entries(alias).map(
          ([key, value]) => `--alias:${key}=${value}`,
        ),
        ...external.map(pkg => `--external:${pkg}`),
        `--format=${format}`,
        outfile ? `--outfile=${outfile}` : null,
        outdir ? `--outdir=${outdir}` : null,
        source,
      ].filter(Boolean),
    )
  }
}
