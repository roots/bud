import {paths, projectConfig, REPO_PATH} from '@repo/constants'
import {log} from '@repo/logger'
import fs from 'fs-extra'
import {globby} from 'globby'
import matter from 'gray-matter'
import path from 'path'

import * as renderer from './renderer/index.js'

/**
 * Get the absolute path of a repo file or directory
 */
const getRepoPath = (...filePath: string[]): string =>
  path.join(paths.root, ...filePath)

/**
 * Get the absolute path of a package file or directory
 */
const getPackagePath = (packageName: string, filePath: string): string =>
  getRepoPath(`sources`, packageName, filePath)

/**
 * Returns props for a template
 */
async function getReadmeProps(
  packageName: string,
): Promise<Record<string, any>> {
  const json = await fs.readJson(
    getPackagePath(packageName, `package.json`),
  )
  return {...json, projectConfig}
}

/**
 * Renders all of the repo READMEs from their templates
 *
 * @remarks
 * Templates are specified in the repo package.json's `manifest` key
 *
 * - A `core` package is a required Bud interface
 * - An `extension` package is an optional Bud interface
 * - A `library` package is not Bud specific but is used by Bud interfaces
 */
;(async function writeReadmeFiles() {
  await renderer.registerPartials()
  await renderer.registerHelpers()

  const templates = await renderer.getTemplates()
  const data = await getReadmeProps(`@roots/bud`)
  await renderer.render(templates.root, `${REPO_PATH}/readme.md`, {
    ...data,
    name: `bud.js`,
  })

  await globby(`${REPO_PATH}/sources/@roots/*`, {
    onlyDirectories: true,
  }).then(async (packages: Array<string>) => {
    log(packages)
    await Promise.all(
      packages.map(async pkg => {
        const usage = await globby([
          `${pkg}/docs/*.mdx`,
          `${pkg}/docs/*.md`,
        ]).then(async (mdfiles: Array<string>) => {
          return await mdfiles.sort().reduce(async (promised, current) => {
            const document = await fs
              .readFile(current, `utf-8`)
              .then(String)
              .then(str => matter(str))

            return [
              ...(await promised),
              ...(document.data.title
                ? [`## ${document.data.title}\n`]
                : []),
              `${document.content}\n`,
            ]
          }, Promise.resolve([]))
        })

        const data = await getReadmeProps(`@roots/${pkg.split(`/`).pop()}`)

        await renderer.render(templates.core, `${pkg}/readme.md`, {
          ...data,
          usage,
        })
      }),
    )
  })
})()
