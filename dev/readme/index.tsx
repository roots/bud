import {readJson} from 'fs-extra'
import path from 'path'
import React from 'react'
import {Signale} from 'signale'

import {manifest} from '../../package.json'
import {render} from './renderer'
import * as Template from './templates'

const REPO_ROOT = path.resolve(__dirname, '../..')

/** Logger */
const interactive = !process.argv.includes(`-v`)
const signale = new Signale({
  interactive,
  secrets: [REPO_ROOT],
})

/**
 * Get the absolute path of a repo file or directory
 */
const getRepoPath = (...filePath: string[]): string =>
  path.join(REPO_ROOT, ...filePath)

/**
 * Get the absolute path of a package file or directory
 */
const getPackagePath = (
  packageName: string,
  filePath: string,
): string => getRepoPath(`packages`, packageName, filePath)

/**
 * Write a README.md file from a template
 */
const writeReadme = async (
  Component: any,
  data: Record<string, any>,
  target: string,
) => {
  signale.await(`[${data.name}] rendering README`)
  signale.info('target', target)
  signale.info('data (type)', typeof data)

  await render(<Component {...data} />, target)
  signale.success(`[${data.name}] rendering README`)
}

/**
 * Returns props for a template
 */
async function getReadmeProps(
  packageName: string,
): Promise<Record<string, any>> {
  signale.await(`[${packageName}] get json`)

  const json = await readJson(
    getPackagePath(packageName, 'package.json'),
  )

  signale.success(`[${packageName}] get json`)

  return {...json, manifest}
}

/**
 * Write a set of README.md files from an array of package names
 */
async function writeReadmes(template: any, group: string) {
  signale.await(`[${group}] rendering README.md`)

  try {
    await Promise.all(
      manifest[group].map(async (packageName: string) => {
        try {
          const path = getPackagePath(packageName, 'README.md')
          const data = await getReadmeProps(packageName)

          await writeReadme(template, data, path)
        } catch (e) {
          throw new Error(e)
        }
      }),
    )
  } catch (e) {
    signale.error(e)
  }

  signale.success(`[${group}] rendering README.md`)
}

/**
 * Renders all of the repo READMEs from their templates
 *
 * @remarks
 * Templates are specified in the repo package.json's `manifest` key
 *
 * - A `core` package is a required Bud interface
 *
 * - An `extension` package is an optional Bud interface
 *
 * - A `library` package is not Bud specific but is used by Bud interfaces
 */
;(async function writeReadmeFiles() {
  /* Templates to render */
  const templates: Array<[any, string]> = [
    [Template.Extension, 'extensions'],
    [Template.Core, 'core'],
    [Template.Library, 'libraries'],
  ]

  /* Render each template */
  await Promise.all(
    templates.map(async ([Template, key]): Promise<void> => {
      await writeReadmes(Template, key)
    }),
  )

  /* Render the repo README */
  await writeReadme(
    Template.Root,
    manifest,
    getRepoPath('README.md'),
  )
})()
