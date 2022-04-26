import {paths, projectConfig} from '@repo/constants'
import {log, logger} from '@repo/logger'
import {readJson} from 'fs-extra'
import {chunk} from 'lodash'
import {cpus} from 'os'
import path from 'path'
import React from 'react'

import {render} from './renderer'
import * as Template from './templates'

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
 * Write a README.md file from a template
 */
const writeReadme = async (
  Component: any,
  data: Record<string, any>,
  target: string,
) => await render(<Component {...data} />, target)

/**
 * Returns props for a template
 */
async function getReadmeProps(
  packageName: string,
): Promise<Record<string, any>> {
  const json = await readJson(getPackagePath(packageName, 'package.json'))
  return {...json, projectConfig}
}

/**
 * Write a set of README.md files from an array of package names
 */
async function writeReadmes(
  template: any,
  group: 'extension' | 'library' | 'core',
) {
  try {
    await chunk(
      projectConfig.packages[group],
      cpus().length > 0 ? cpus().length : 1,
    ).reduce(async (promised, chunk) => {
      await promised
      await Promise.all(
        chunk.map(async (packageName: string) => {
          try {
            const path = getPackagePath(packageName, 'README.md')
            logger.scope(group, packageName, 'resolve').success()

            const data = await getReadmeProps(packageName)
            logger.scope(group, packageName, 'fetch').success()

            await writeReadme(template, data, path)
            logger.scope(group, packageName, 'render').success()
          } catch (e) {
            throw new Error(e)
          }
        }),
      )
    }, Promise.resolve())
  } catch (e) {
    logger.error(template, group, 'error during render')
    logger.error(e)
  }

  logger.scope(group).success()
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
  /* Templates to render */
  const templates: Array<[any, 'extension' | 'core' | 'library']> = [
    [Template.Extension, 'extension'],
    [Template.Core, 'core'],
    [Template.Library, 'library'],
  ]

  /* Render each template */
  await templates.reduce(
    async (promised, [Template, key]): Promise<void> => {
      await promised
      log(`Writing ${key} README.md files`)
      await writeReadmes(Template, key)
    },
    Promise.resolve(),
  )

  /* Render the repo README */
  await writeReadme(Template.Root, projectConfig, getRepoPath('README.md'))
})()
