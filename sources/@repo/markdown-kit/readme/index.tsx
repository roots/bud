import {paths, projectConfig} from '@repo/constants'
import {logger} from '@repo/logger'
import {readJson} from 'fs-extra'
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
) => {
  logger.await(`[${data.name}] rendering README`)
  logger.info('target', target)

  await render(<Component {...data} />, target)
  logger.success(`[${data.name}] rendering README`)
}

/**
 * Returns props for a template
 */
async function getReadmeProps(
  packageName: string,
): Promise<Record<string, any>> {
  logger.await(`[${packageName}] get json`)

  const json = await readJson(getPackagePath(packageName, 'package.json'))

  logger.success(`[${packageName}] get json`)

  return {...json, projectConfig}
}

/**
 * Write a set of README.md files from an array of package names
 */
async function writeReadmes(
  template: any,
  group: 'extension' | 'library' | 'core',
) {
  logger.await(`[${group}] rendering README.md`)

  try {
    await Promise.all(
      projectConfig.packages[group].map(async (packageName: string) => {
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
    logger.error(template, group, 'error during render')
    logger.error(e)
  }

  logger.success(`[${group}] rendering README.md`)
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
  await Promise.all(
    templates.map(async ([Template, key]): Promise<void> => {
      await writeReadmes(Template, key)
    }),
  )

  /* Render the repo README */
  await writeReadme(Template.Root, projectConfig, getRepoPath('README.md'))
})()
