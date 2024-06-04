import {env} from 'node:process'

import {path as repoPath} from '@repo/constants'
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
let dirname: string
let page: Page
let port: number

/**
 * Source path
 */
const sourcePath = (...args: string[]) =>
  repoPath(`examples`, dirname, ...args)

/**
 * Target path
 */
const path = (...args: string[]) =>
  repoPath(`storage`, `fixtures`, dirname, ...args)

/**
 * Get dev url
 */
const url = (port?: number) =>
  port ? `http://0.0.0.0:${port}/` : `http://0.0.0.0/`

/**
 * Setup test
 */
const setup = async (name: string): Promise<void> => {
  dirname = name

  try {
    port = await install()
    if (!port) throw new Error(`Problem installing fixture`)
  } catch (error) {
    throw error
  }

  try {
    dev = run(port)

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
}

const makeSetup = (name: string) => async () => await setup(name)

/**
 * Install fixture
 */
const install = async () => {
  await fs.remove(path())

  await fs.copy(sourcePath(), path(), {
    overwrite: true,
  })

  const pkg = await fs.read(path(`package.json`))

  if (!pkg) throw new Error(`No package.json found`)
  if (!pkg?.devDependencies) pkg.devDependencies = {}

  pkg.devDependencies = Object.entries(pkg?.devDependencies).reduce(
    (json, [key, value]) => ({
      ...json,
      [key]: (value as string).replace(`workspace:*`, `latest`),
    }),
    {},
  )

  await fs.write(path(`package.json`), pkg)

  await execa(`npm`, [`install`, `--registry`, `http://localhost:4873`], {
    cwd: path(),
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
const run = async (port: number): Promise<ExecaReturnValue> => {
  return execa(
    `npx`,
    [
      `bud`,
      `build`,
      `development`,
      `--no-cache`,
      `--html`,
      `--port`,
      `${port}`,
    ],
    {cwd: path()},
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

const read = async (...segments: string[]) => {
  return await fs.read(path(...segments))
}

const update = async (path: string, code: string) => {
  await fs.write(path, code)
  await page.waitForTimeout(12000)
}

export {
  close,
  dev,
  install,
  makeSetup,
  page,
  path,
  port,
  read,
  run,
  setup,
  update,
  url,
}
