import type {Bud} from '@roots/bud'

import axios from '@roots/bud-support/axios'
import logger from '@roots/bud-support/logger'

async function budUpdateCheck(bud: Bud) {
  if (isCI(bud)) {
    return log(`CI environment detected. Skipping bud upgrade check.`)
  }
  if (isIndeterminateInstalledVersion(bud)) {
    return log(
      `Current version of bud.js could not be determined. Skipping bud upgrade check.`,
    )
  }
  if (isSilent(bud)) {
    return log(`Silent mode detected. Skipping bud upgrade check.`)
  }
  if (isDev(bud)) {
    return log(`Dev environment detected. Skipping bud upgrade check.`)
  }

  const nowTime = Date.now()
  const pastWeekTime = nowTime - 1000 * 60 * 60 * 24 * 7

  if (await hasCheckFile(bud)) {
    const updateCheckfile = await bud.fs.read(
      bud.path(`@storage`, `bud-check.yml`),
    )
    if (updateCheckfile?.changeTime) {
      const outdated = updateCheckfile.changeTime > pastWeekTime

      if (outdated) {
        return log(`bud.js version checked within past week. Skipping.`)
      }
    }
  }

  const {data} = await axios.get(
    `https://registry.npmjs.org/@roots/bud/latest`,
  )
  if (!data?.version || !bud.context?.bud?.version) return

  if (data.version !== bud.context.bud.version) {
    return process.stdout.write(
      `\n⚠️ A new version of bud.js is available: ${data.version}\nRun bud upgrade to automatically install the latest version to your project.\n`,
    )
  }

  /**
   * Write the current time to the storage file
   */
  await bud.fs.write(bud.path(`@storage`, `bud-check.yml`), {
    changeTime: nowTime,
  })
}

const hasCheckFile = async (bud: Bud): Promise<boolean> => {
  return !!(await bud.fs.exists(bud.path(`@storage`, `bud-check.yml`)))
}

const isCI = (bud: Bud): boolean => bud.context?.ci

const isSilent = (bud: Bud): boolean => bud.context?.silent

const isDev = (bud: Bud) =>
  bud.context.bud.version === `0.0.0` ||
  bud.context.bud.version.includes(`-`)

const isIndeterminateInstalledVersion = (bud: Bud) =>
  !bud.context?.bud?.version

const log = (...messages: any[]) =>
  logger.scope(`bud`, `update`).log(...messages)

export {budUpdateCheck as default}
