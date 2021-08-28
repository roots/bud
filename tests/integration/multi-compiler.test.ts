import execa from 'execa'
import {readFile, readJson} from 'fs-extra'
import {join} from 'path'

import {Assets} from '../util/integration'

interface CompilerArtifacts {
  assets: Assets
  manifest: any
}

const cwd = `${process.cwd()}/examples/multi-compiler`

jest.setTimeout(60000)

describe('multi-compiler', () => {
  const parent: CompilerArtifacts = {
    assets: {},
    manifest: {},
  }

  const plugin: CompilerArtifacts = {
    assets: {},
    manifest: {},
  }

  const theme: CompilerArtifacts = {
    assets: {},
    manifest: {},
  }

  beforeAll(async () => {
    await execa('yarn', ['bud', 'extensions:install'], {
      cwd,
    })
    await execa('yarn', ['bud', `build:production`, '--ci'], {
      cwd,
    })

    parent.manifest = await readJson(
      `${cwd}/dist/global/manifest.json`,
    )
    parent.assets = await Object.entries(parent.manifest).reduce(
      async (promised: Promise<any>, [name, path]) => {
        const assets = await promised
        const buffer = await readFile(
          `${cwd}/dist/global/${path}`,
          'utf8',
        )

        return {
          ...assets,
          [name]: buffer.toString(),
        }
      },
      Promise.resolve(),
    )

    plugin.manifest = await readJson(
      `${cwd}/dist/plugin/manifest.json`,
    )
    plugin.assets = await Object.entries(plugin.manifest).reduce(
      async (promised: Promise<any>, [name, path]) => {
        const assets = await promised
        const buffer = await readFile(
          `${cwd}/dist/plugin/${path}`,
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
          `${cwd}/dist/theme/${path}`,
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

  describe('global.js', () => {
    it('has contents', () => {
      expect(parent.assets['global.js'].length).toBeGreaterThan(
        10,
      )
    })

    it('is transpiled', () => {
      expect(
        parent.assets['global.js'].includes('import'),
      ).toBeFalsy()
    })
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

  it('module map matches snapshot', async () => {
    const artifact = await readJson(
      join(
        process.cwd(),
        'examples/multi-compiler/.budfiles/bud-modules.json',
      ),
    )

    expect(artifact.chunks).toMatchSnapshot({
      byName: {
        global: expect.any(Number),
      },
      bySource: {
        '0 global': expect.any(Number),
      },
      usedIds: [expect.any(Number)],
    })
  })
})
