const {readdirSync, existsSync, statSync} = require('fs')
const {join, resolve} = require('path')

/**
 * Webpack utilities
 *
 * @return {bool}
 */
const isProduction = process.env.NODE_ENV === 'production'
const projectDir = process.cwd()
const projectPath = path => resolve(projectDir, path)

/**
 * Return array of directories
 *
 * @param  {string} parentDir
 * @return {array}
 */
const dirs = parentDir =>
  readdirSync(resolve(projectDir, join('src', parentDir))).filter(file =>
    statSync(resolve(projectDir, join('src', parentDir, file))).isDirectory(),
  )

/**
 * Globbed entrypoints
 */
const globber = groups => ({
  /** src/[group]/... */
  ...groups.reduce(
    (acc, group, index) => ({
      ...index > 0 ? acc : [],

      /** src[group]/[dir] */
      ...dirs(group.from).reduce(
        (acc, asset, index) => ({
          ...index > 0 ? acc: [],

          /** src/[group]/[dir]/[entrypoint] */
          ...group.entries.reduce(
            (acc, entry, index) => {
              const accumulated = index > 0
                ? acc
                : []

              const file = join(projectDir, 'src', group.from, asset, entry[1])
              const chunk = join(group.from, asset, entry[0])
              const exists = existsSync(file)

              return {
                ...accumulated,
                ...(exists ? {[chunk]: file} : {}),
              }
            },
            group.entries[0],
          ),
        }),
        dirs(group.from)[0],
      ),
    }),
    groups[0],
  ),
})

const util = {
  isProduction,
  globber,
  projectPath,
}

module.exports = util
