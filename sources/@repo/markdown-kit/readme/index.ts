import {path, projectConfig} from '@repo/constants'
import {Filesystem, json as Json} from '@roots/bud-support/filesystem'
import globby from '@roots/bud-support/globby'
import type {GrayMatterFile} from 'gray-matter'
import matter from 'gray-matter'
import {format} from 'prettier'

import {templates} from './renderer/index.js'

const fs = new Filesystem()

type Chunks = Array<string> | Promise<Array<string>>
type File = GrayMatterFile<string>
type ChunkReducer<T> = (chunks: Chunks, obj: T) => Promise<Chunks>
type ForPackage<T> = (signifier: string) => T

/**
 * Returns props for a template
 */
const getProps = async (signifier: string) => {
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
      await files.sort().reduce(async (files, path) => {
        const body = await fs.read(path, `utf8`)
        return [...(await files), matter(body)]
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
    format(templates.core(data), {parser: `markdown`}),
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
      await fs.read(path(`sources/${signifier}/docs/${docsPath}`), `utf8`),
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
await globby(path(`sources/@roots/*`), {
  onlyDirectories: true,
}).then(async packages => {
  await Promise.all(
    packages.map(path => path.split(`sources/`).pop()).map(generateReadme),
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
const readme = format(templates.root(data), {parser: `markdown`})
await fs.write(outputPath, readme)
