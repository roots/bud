import {path} from '@repo/constants'
import {CommandClass} from 'clipanion'
import * as fs from 'fs-jetpack'

import {Command} from './base.command'

interface BundleProps {
  alias?: Record<string, string>
  external?: Array<string>
  format?: `cjs` | `esm`
  outdir?: string
  outfile?: string
  source: string
}

export class Build extends Command {
  public static paths = [[`@bud`, `build`]]

  public static usage: CommandClass['usage'] = {
    category: `@bud`,
    description: `Build packages`,
    examples: [[`build packages`, `yarn @bud build`]],
  }

  public tsconfig = path(`config/tsconfig.json`)

  public async bundle({
    alias = {},
    external = [],
    format = `esm`,
    outdir,
    outfile,
    source,
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

  public async execute() {
    await Promise.all([
      /**
       * @aws-sdk/client-s3
       */
      this.bundle({
        format: `cjs`,
        outfile: `sources/@roots/filesystem/vendor/sdk/index.cjs`,
        source: `node_modules/@aws-sdk/client-s3/dist-es/index.js`,
      }),
      /**
       * highlight.js
       */
      this.bundle({
        format: `esm`,
        outfile: `sources/@roots/bud-support/vendor/highlight/index.js`,
        source: `sources/@roots/bud-support/src/highlight/index.ts`,
      }).then(async () => {
        await fs.writeAsync(
          path(`sources/@roots/bud-support/vendor/highlight/index.d.ts`),
          `export declare const highlight: (code: string) => string;`,
        )
      }),

      /**
       * html-loader
       */
      this.bundle({
        external: [`./runtime/getUrl.js`],
        format: `cjs`,
        outfile: path(
          `sources/@roots/bud-support/vendor/html-loader/index.cjs`,
        ),
        source: path(`node_modules/html-loader/dist/index.js`),
      }).then(async () => {
        const modulePath = path(
          `sources/@roots/bud-support/vendor/html-loader/index.cjs`,
        )
        const code = await fs.readAsync(modulePath)
        await fs.writeAsync(
          modulePath,
          code.replace(/\.\/runtime\/getUrl\.js/g, `./runtime/getUrl.cjs`),
        )
        await fs.copyAsync(
          path(`node_modules/html-loader/dist/runtime/getUrl.js`),
          path(
            `sources/@roots/bud-support/vendor/html-loader/runtime/getUrl.cjs`,
          ),
          {overwrite: true},
        )
      }),
      /**
       * html-webpack-plugin
       */
      this.bundle({
        external: [`./lib/loader.js`],
        format: `cjs`,
        outfile: `sources/@roots/bud-support/vendor/html-webpack-plugin/index.cjs`,
        source: `node_modules/html-webpack-plugin/index.js`,
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
    ]).catch(e => {
      throw e
    })

    const result = await this.cli
      .run([`@bud`, `tsc`, `--build`, this.tsconfig, `--force`])
      .catch(error => {
        throw error
      })
    if (result !== 0) throw new Error(`Build failed`)
  }
}
