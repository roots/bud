import type {GrayMatterFile} from 'gray-matter'

import {sep} from 'path'

import {path} from '@repo/constants'
import {Filesystem, json as Json} from '@roots/bud-support/filesystem'
import globby from '@roots/bud-support/globby'
import {Logger} from '@roots/bud-support/logger'
import matter from 'gray-matter'
import {format} from 'prettier'

import {templates} from './renderer/index.js'

type Chunks = Array<string> | Promise<Array<string>>
type File = GrayMatterFile<string>
type ChunkReducer<T> = (chunks: Chunks, obj: T) => Promise<Chunks>
type ForPackage<T> = (signifier: string) => T

const fs = new Filesystem()
const logger = new Logger({logLevel: `info`})

/**
 * Returns props for a template
 */
const getProps = async (signifier: string) => {
  const {default: projectConfig} = await import(path(`config`, `monorepo.config.cjs`))
  const json = await Json.read(path(`sources`, signifier, `package.json`))
  return {...json, projectConfig}
}

/**
 * Generate readme from a package signifier
 */
const generateReadme = async (signifier: string) => {
  const chunks = []

  const sections = await globby(
    path(`sources`, signifier, `docs`, `*.{md,mdx}`),
  ).then(
    async files =>
      await files.sort().reduce(async (accumulator, path, i) => {
        logger.log(`writing ${signifier} ${i + 1}/${files.length}`)
        const body = await fs.read(path, `utf8`).catch(error => {
          logger.error(error.message)
        })
        logger.log(
          `${signifier} ${i + 1}/${files.length} body is ${
            body.length
          } characters`,
        )
        return [...(await accumulator), matter(body)]
      }, Promise.resolve([])),
  )

  chunks.push(
    ...sections?.reduce(
      (chunks, {content, data}) => [
        ...chunks,
        data?.title ? `## ${data?.title}` : undefined,
        content,
      ],
      [],
    ),
  )

  const data = await getProps(signifier)
  data.sections = await sections.reduce(topics(signifier), chunks)

  await fs.write(
    path(`sources`, signifier, `README.md`),
    await format(templates.core(data), {parser: `markdown`}),
  )
}

const topics: ForPackage<ChunkReducer<File>> =
  signifier => async (promised, file) => {
    const chunks = await promised
    if (!file?.data?.parts) return chunks
    return await file.data.parts.reduce(partials(signifier), chunks)
  }

const partials: ForPackage<ChunkReducer<string>> =
  signifier => async (promised, docsPath) => {
    const chunks = await promised

    const file = matter(
      await fs.read(path(`sources`, signifier, `docs`, docsPath), `utf8`),
    )

    return [
      ...chunks,
      file?.data?.title ? `### ${file.data?.title}` : undefined,
      file?.content ? file.content : undefined,
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
await globby(path(`sources`, `@roots`, `*`), {
  onlyDirectories: true,
}).then(async packages => {
  await Promise.all(
    packages
      .map(path => path.split(`sources${sep}`).pop())
      .map(generateReadme),
  )
})

/**
 * Root readme
 */
const outputPath = path(`readme.md`)
const data = {
  ...(await getProps(`@roots/bud`)),
  name: `bud.js`,
}
const body = templates.root(data)
logger.log(`repo readme.md is ${body.length} characters`)
const formatted = await format(templates.root(data), {
  parser: `markdown`,
}).catch(error => logger.error(`repo readme.md`, error.message))
logger.log(formatted)
await fs
  .write(outputPath, formatted)
  .catch(error => logger.error(`repo readme.md`, error.message))
  .finally(() => logger.log(`Wrote repo readme.md`))
