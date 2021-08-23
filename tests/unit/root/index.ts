import {globby} from '@roots/bud-support'
import {readFile, readFileSync} from 'fs-extra'
import {join} from 'path'

describe('repo', function () {
  it('readme.md matches snapshot', async () => {
    const artifact = await readFile(
      join(process.cwd(), 'README.md'),
    )

    expect(artifact.toString()).toMatchSnapshot()
  })

  it('LICENSE.md matches snapshot', async () => {
    const artifact = await readFile(
      join(process.cwd(), 'LICENSE.md'),
    )

    expect(artifact.toString()).toMatchSnapshot()
  })

  it('sass is not installed in the monorepo', async () => {
    try {
      expect(require.resolve('sass')).toThrowError(
        `Cannot find module 'sass' from 'tests/unit/root/index.ts`,
      )
    } catch {}
  })

  it('examples/package.json matches snapshot', done => {
    globby.globbySync('examples/*/package.json').map(json => {
      expect(readFileSync(json).toString()).toMatchSnapshot()
    })

    done()
  })
})
