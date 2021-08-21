import {readFile} from 'fs-extra'
import {join} from 'path'

describe('repo', function () {
  it('readme.md matches snapshot', async () => {
    const artifact = await readFile(
      join(process.cwd(), 'README.md'),
    )

    expect(artifact).toMatchSnapshot()
  })
})
