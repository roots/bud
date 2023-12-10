import {env} from 'node:process'

import {path} from '@repo/constants'
import execa, {ExecaReturnValue} from '@roots/bud-support/execa'
import {fs} from '@roots/bud-support/filesystem'
import {getPort} from '@roots/bud-support/get-port'
import {type Browser, chromium, type Page} from 'playwright'

declare global {
  interface Window {
    bud: any
    reloadCalled: boolean
  }
}

let browser: Browser
let dev: Promise<ExecaReturnValue>
let page: Page
let port: number

/**
 * Get source path
 */
const fromPath = (...parts: Array<string>) => path(`examples`, ...parts)

/**
 * Get destination path
 */
const toPath = (...parts: Array<string>) =>
  path(`storage`, `fixtures`, ...parts)

/**
 * Get dev url
 */
const url = (port?: number) => port ? `http://0.0.0.0:${port}/` : `http://0.0.0.0/`

/**
 * Install fixture
 */
const install = async (dirname: string) => {
  await fs.remove(toPath(dirname))

  await fs.copy(fromPath(dirname), toPath(dirname), {
    overwrite: true,
  })

  const pkg = await fs.read(toPath(dirname, `package.json`))

  if (!pkg) throw new Error(`No package.json found`)
  if (!pkg?.devDependencies) pkg.devDependencies = {}

  pkg.devDependencies = Object.entries(pkg?.devDependencies).reduce(
    (json, [key, value]) => ({
      ...json,
      [key]: (value as string).replace(`workspace:*`, `latest`),
    }),
    {},
  )

  await fs.write(toPath(dirname, `package.json`), pkg)
  await execa(`npm`, [`install`, `--registry`, `http://localhost:4873`], {
    cwd: toPath(dirname),
    env: {NODE_ENV: `development`},
  })

  try {
    return await getPort({
      port: [
        3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010,
      ],
    })
  } catch (error) {
    throw error
  }
}

/**
 * Run development server
 */
const run = async (
  dirname: string,
  port: number,
): Promise<ExecaReturnValue> => {
  return execa(
    `npx`,
    [`bud`, `build`, `development`, `--no-cache`, `--html`, `--port`, `${port}`],
    {cwd: toPath(dirname)},
  )
}

const close = async () => {
  try {
    await page?.close()
    await browser?.close()
  } catch (error) {
    throw error
  }
}


const setupTest = async (dirname: string) => {
  try {
    port = await install(`babel`)
    if (!port) throw new Error(`Problem installing fixture`)
  } catch (error) {
    throw error
  }

  try {
    dev = run(dirname, port)

    browser = await chromium.launch({
      headless: !!env.CI,
    })
    if (!browser) throw new Error(`Browser could not be launched`)

    page = await browser?.newPage()
    if (!page) throw new Error(`Page could not be created`)

    await page?.waitForTimeout(10000)

    await page?.goto(url(port))
  } catch (error) {
    throw error
  }

  return {browser, dev, page, port}
}

export {close, fromPath, install, run, setupTest, toPath, url}
