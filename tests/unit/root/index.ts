import {readFile} from 'fs-extra'
import {join} from 'path'

describe('repo', function () {
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
})
