import type {Bud} from '@roots/bud'

import axios from '@roots/bud-support/axios'
import logger from '@roots/bud-support/logger'

export default async function budUpdateCheck(bud: Bud) {
  if (bud.context?.ci) {
    return log(`CI environment detected. Skipping.`)
  }
  if (bud.context?.silent) {
    return log(`Silent mode detected. Skipping.`)
  }
  if (!bud.context?.bud?.version) {
    return log(
      `Current version of bud.js could not be determined. Skipping.`,
    )
  }
  if (
    bud.context?.bud.version === `0.0.0` ||
    bud.context?.bud.version.includes(`-`)
  ) {
    return log(`Dev environment detected. Skipping.`)
  }

  const nowTime = Date.now()
  const pastWeekTime = nowTime - 1000 * 60 * 60 * 24 * 7

  if (await bud.fs.exists(bud.path(`@storage`, `bud-check.yml`))) {
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
      `\n⚠️ A new version of bud.js is available: ${data.version}\nRun \`bud upgrade\` to automatically install the latest version to your project.\n`,
    )
  }

  await bud.fs.write(bud.path(`@storage`, `bud-check.yml`), {
    changeTime: nowTime,
  })
}

const log = (...messages: any[]) =>
  logger.scope(`bud`, `update`).log(...messages)
