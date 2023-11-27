import type {Bud} from '@roots/bud'

import chalk from '@roots/bud-support/chalk'
import execa from '@roots/bud-support/execa'
import figures from '@roots/bud-support/figures'
import logger from '@roots/bud-support/logger'

async function browserslistUpdateCheck(bud: Bud) {
  if (!(await hasBrowserslistConfig(bud))) {
    return log(
      `No browserslist configuration found. Skipping browserslist upgrade check.`,
    )
  }

  if (isCI(bud)) {
    return log(
      `CI environment detected. Skipping browserslist upgrade check.`,
    )
  }

  if (!isEnabled(bud)) {
    return log(`Browserslist update check disabled. Skipping.`)
  }

  const nowTime = Date.now()
  const pastWeekTime = nowTime - 1000 * 60 * 60 * 24 * 7

  if (await hasBrowserslistCheckFile(bud)) {
    const response = await bud.fs.read(
      bud.path(`@storage`, `browserslist-db-check.yml`),
    )
    if (response?.changeTime) {
      const outdated =
        response.changeTime && response.changeTime > pastWeekTime

      if (outdated && bud.context?.browserslistUpdate !== true) {
        return log(
          `Browserslist database updated within the past week. Skipping.`,
        )
      }
    }
  }

  if (!isSilent(bud)) {
    process.stdout.write(`\nChecking for browserslist updates...\n`)
    process.stdout.write(
      `  --> This check runs once per week when a browserslist is specified in package.json\n`,
    )
    process.stdout.write(
      `  --> You can disable this behavior with the ${chalk.blue(
        `--no-browserslist-update`,
      )} flag or by setting ${chalk.blue(
        `BUD_BROWSERSLIST_UPDATE=false`,
      )} in your project .env file.\n`,
    )
  }

  /**
   * Write the current time to the storage file
   */
  await bud.fs.write(bud.path(`@storage`, `browserslist-db-check.yml`), {
    changeTime: nowTime,
  })

  await updateBrowserslist(bud)
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
const isEnabled = (bud: Bud): boolean => {
  if (typeof bud.context?.browserslistUpdate !== `undefined`) {
    log(`check enabled:`, bud.context.browserslistUpdate)
    return bud.context.browserslistUpdate
  }

  log(`check enabled: true (default)`)

  return true
}

const isSilent = (bud: Bud): boolean => bud.context?.silent

const log = (...messages: any[]) =>
  logger.scope(`browserslist`).log(...messages)

const updateBrowserslist = async (bud: Bud) => {
  let bin: string
  const subcommand: Array<string> = []

  /**
   * Shared child proc options
   */
  const options = {
    cwd: bud.context.basedir,
    env: {NODE_ENV: `development`},
    extendEnv: true,
    reject: false,
  }

  switch (bud.context.pm) {
    case `pnpm`:
      bin = `pnpx`
      subcommand.push(`update-browserslist-db`)
      break

    case `yarn`:
      bin = `yarn`
      subcommand.push(`dlx`, `update-browserslist-db`)
      break

    default:
      bin = `npx`
      subcommand.push(`update-browserslist-db`)
      break
  }

  const child = execa(bin, subcommand, options).on(`exit`, code => {
    if (isSilent(bud)) return

    if (code === 0) {
      return process.stdout.write(
        chalk.green(
          `  --> ${figures.tick} browserslist successfully updated\n`,
        ),
      )
    }

    return process.stdout.write(
      chalk.yellow(
        `  --> ${
          figures.warning
        } Browserslist update failed. Try running ${chalk.blue(
          `${bin} ${subcommand.join(` `)}`,
        )} manually.\n  --> ${
          figures.warning
        } This check will not be performed again for another week. The ${chalk.blue(
          `--browserslist-update`,
        )} flag may be used to force a retry.\n`,
      ),
    )
  })

  child.stdout.on(`data`, message => {
    const text = message.toString().trim()

    if (!isSilent(bud) && text.includes(`update-browserslist-db:`)) {
      process.stdout.write(
        [`  -->`, text.replace(`update-browserslist-db: `, ``), `\n`].join(
          ` `,
        ),
      )
    }
  })
  child.stderr.on(`data`, message => {
    const text = message.toString().trim()

    if (!isSilent(bud) && text.includes(`update-browserslist-db:`)) {
      process.stdout.write(
        chalk.yellow(
          [
            `  -->`,
            figures.warning,
            text.replace(`update-browserslist-db: `, ``),
            `\n`,
          ].join(` `),
        ),
      )
    }
  })

  return await child
}

export {browserslistUpdateCheck as default, updateBrowserslist}
