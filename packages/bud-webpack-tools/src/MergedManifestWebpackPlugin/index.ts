import Webpack from 'webpack'
import fs from 'fs-extra'
import path from 'path'
import {merge} from 'lodash'
import {format} from 'prettier'

class MergedManifestWebpackPlugin {
  public plugin: any
  public dir: string

  constructor() {
    this.plugin = {
      name: 'MergedManifestPlugin',
    }
    this.done = this.done.bind(this)
  }

  apply(compiler: Webpack.Compiler): void {
    this.dir = compiler.options.output.path

    compiler.hooks.done.tapAsync(this.plugin, this.done)
  }

  async done(compilation, callback) {
    try {
      const entrypoints = await fs.readJson(
        path.resolve(this.dir, 'entrypoints.json'),
      )

      const wordpress = await fs.readJson(
        path.resolve(this.dir, 'wordpress.json'),
      )

      console.log(entrypoints, wordpress)

      await fs.outputFile(
        path.resolve(this.dir, 'assets.json'),

        format(
          JSON.stringify(
            merge(
              Object.entries(entrypoints).map(
                ([entrypoint, assets]) => ({
                  [entrypoint]: {
                    assets,
                  },
                }),
              ),
              Object.entries(wordpress).map(
                ([entrypoint, dependencies]) => ({
                  [entrypoint]: {
                    dependencies,
                  },
                }),
              ),
            ).reduce(
              (acc, curr) => ({
                ...acc,
                ...curr,
              }),
              {},
            ),
          ),
          {
            parser: 'json',
            printWidth: 40,
          },
        ),
      )
    } catch (err) {
      console.error(err)
    }

    return callback()
  }
}

export {MergedManifestWebpackPlugin as default}
