import {readFile, readJson} from 'fs-extra'
import {Assets} from '../util/integration'
import execa from 'execa'

const cwd = `${process.cwd()}/examples/multi-compiler`

jest.setTimeout(1000000)

describe('multi-compiler', () => {
  const plugin: {
    assets: Assets
    manifest: any
  } = {
    assets: {},
    manifest: {},
  }

  const theme: {
    assets: Assets
    manifest: any
  } = {
    assets: {},
    manifest: {},
  }

  beforeAll(async () => {
    await execa('yarn', ['bud', 'extensions:install'], {
      cwd,
    })
    await execa(
      'yarn',
      ['bud', `build:production`, '--ci', '--debug'],
      {cwd},
    )

    plugin.manifest = await readJson(
      `${cwd}/dist/plugin/manifest.json`,
    )
    plugin.assets = await Object.entries(plugin.manifest).reduce(
      async (promised: Promise<any>, [name, path]) => {
        const assets = await promised
        const buffer = await readFile(
          `${cwd}/dist/plugin${path}`,
          'utf8',
        )

        return {
          ...assets,
          [name]: buffer.toString(),
        }
      },
      Promise.resolve(),
    )

    theme.manifest = await readJson(
      `${cwd}/dist/theme/manifest.json`,
    )
    theme.assets = await Object.entries(theme.manifest).reduce(
      async (promised: Promise<any>, [name, path]) => {
        const assets = await promised
        const buffer = await readFile(
          `${cwd}/dist/theme${path}`,
          'utf8',
        )

        return {
          ...assets,
          [name]: buffer.toString(),
        }
      },
      Promise.resolve(),
    )

    return Promise.resolve()
  })

  describe('theme.js', () => {
    it('has contents', () => {
      expect(theme.assets['theme.js'].length).toBeGreaterThan(10)
    })

    it('is transpiled', () => {
      expect(
        theme.assets['theme.js'].includes('import'),
      ).toBeFalsy()
    })
  })

  describe('plugin.js', () => {
    it('has contents', () => {
      expect(plugin.assets['plugin.js'].length).toBeGreaterThan(
        10,
      )
    })

    it('is transpiled', () => {
      expect(
        plugin.assets['plugin.js'].includes('import'),
      ).toBeFalsy()
    })
  })
})
