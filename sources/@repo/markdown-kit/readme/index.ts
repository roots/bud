import {join} from 'node:path'

import {paths, projectConfig, REPO_PATH} from '@repo/constants'
import fs from 'fs-extra'
import {globby} from 'globby'
import matter from 'gray-matter'
import {format} from 'prettier'

import {templates} from './renderer/index.js'

/**
 * Get the absolute path of a repo file or directory
 */
const repoPath = (...filePath: string[]): string =>
  join(paths.root, ...filePath)

/**
 * Get the absolute path of a package file or directory
 */
const getPackagePath = (packageName: string, filePath: string): string =>
  repoPath(`sources`, packageName, filePath)

/**
 * Returns props for a template
 */
const getReadmeProps = async (
  packageName: string,
): Promise<Record<string, any>> => {
  const json = await fs.readJson(
    getPackagePath(packageName, `package.json`),
  )
  return {...json, projectConfig}
}

const fetch = async (path: string) => {
  return await fs
    .readFile(path, `utf-8`)
    .then(String)
    .then(contents => matter(contents))
    .then(({data, content}) => ({data, content}))
}

const getFiles = async (pkg: string) => {
  return await globby(repoPath(`sources`, pkg, `docs`, `*.{md,mdx}`)).then(
    async files => await Promise.all(files.sort().map(fetch)),
  )
}

const joinParts = (
  aggregated: Array<string>,
  {data, content},
): Array<string | false> => {
  return [
    // @ts-ignore
    ...aggregated,
    // @ts-ignore
    data?.title ? `## ${data?.title}\n\n` : false,
    // @ts-ignore
    content,
  ]
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
await globby(`${REPO_PATH}/sources/@roots/*`, {
  onlyDirectories: true,
  absolute: false,
}).then(async (packages: Array<string>) => {
  await Promise.all(
    packages
      .map(pkg => pkg.split(`sources/`).pop())
      .map(async pkg => {
        const path = repoPath(`sources`, pkg, `readme.md`)
        const files = await getFiles(pkg)

        const sections = files.reduce(joinParts, []).filter(Boolean)

        await Promise.all(
          files.map(async file =>
            file.data?.parts?.map(async innerFile => {
              const path = repoPath(`sources`, pkg, `docs`, innerFile)
              const result = await fetch(path)
              result?.data?.title &&
                sections.push(`### ${result.data?.title}`)
              result?.content && sections.push(result.content)
            }),
          ),
        )

        const data = {...(await getReadmeProps(pkg)), sections}
        const readme = format(templates.core(data), {parser: `markdown`})
        await fs.writeFile(path, readme, `utf8`)
      }),
  )
})

/**
 * Root readme
 */
const path = `${REPO_PATH}/readme.md`
const data = {
  ...(await getReadmeProps(`@roots/bud`)),
  name: `bud.js`,
}
const readme = format(templates.root(data), {parser: `markdown`})
await fs.writeFile(path, readme, `utf8`)
