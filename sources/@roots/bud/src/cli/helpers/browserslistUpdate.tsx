import type {Bud} from '@roots/bud'

import execa from '@roots/bud-support/execa'
import logger from '@roots/bud-support/logger'

export default async function browserslistUpdateCheck(bud: Bud) {
  if ((!await hasBrowserslistConfig(bud))) {
    return logger.log(
      `No browserslist configuration found. Skipping browserslist upgrade check.`,
    )
  }

  if (isCI(bud)) {
    return logger.log(
      `CI environment detected. Skipping browserslist upgrade check.`,
    )
  }

  const nowTime = Date.now()
  const pastWeekTime = nowTime - 1000 * 60 * 60 * 24 * 7

  if (await hasBrowserslistCheckFile(bud)) {
    let changeTime: number
    let response = await bud.fs.read(
      bud.path(`@storage`, `browserslist-db-check.yml`),
    )
    if (response?.changeTime) changeTime = response.changeTime

    if (changeTime && changeTime > pastWeekTime) {
      logger.log(
        `Browserslist database updated within the past week. Skipping.`,
      )
      return
    }
  }

  if (!isSilent(bud)) {
    process.stdout.write(`\nChecking for browserslist updates...\n`)
    process.stdout.write(
      `(you can disable this behavior with the --no-browserslist-update flag.)\n\n`,
    )
  }

  /**
   * Write the current time to the storage file
   */
  await bud.fs.write(bud.path(`@storage`, `browserslist-db-check.yml`), {
    changeTime: nowTime,
  })

  /**
   * Run the update command
   */
  if (bud.context.pm === `npm` || bud.context.pm === `yarn-classic`) {
    return await execa(`npx`, [`update-browserslist-db`], {
      cwd: bud.context.basedir,
      encoding: `utf8`,
      env: {NODE_ENV: `development`},
      extendEnv: true,
    })
  }

  if (bud.context.pm === `pnpm`) {
    return await execa(`pnpx`, [`update-browserslist-db`], {
      cwd: bud.context.basedir,
      encoding: `utf8`,
      env: {NODE_ENV: `development`},
      extendEnv: true,
    })
  }

  if (bud.context.pm === `yarn`) {
    return await execa(`yarn`, [`dlx`, `update-browserslist-db`], {
      cwd: bud.context.basedir,
      encoding: `utf8`,
      env: {NODE_ENV: `development`},
      extendEnv: true,
    })
  }
}

const hasBrowserslistConfig = async (bud: Bud): Promise<boolean> => {
  const hasBrowserslistListConfig = await bud.fs.exists(`.browserslistrc`)
  const hasBrowserslistPackageConfig = bud.context?.manifest?.browserslist
  return hasBrowserslistListConfig || hasBrowserslistPackageConfig
}

const hasBrowserslistCheckFile = async (bud: Bud): Promise<boolean> => {
  return !!(await bud.fs.exists(
    bud.path(`@storage`, `browserslist-db-check.yml`),
  ))
}

const isCI = (bud: Bud): boolean => bud.context?.ci
const isSilent = (bud: Bud): boolean => bud.context?.silent
