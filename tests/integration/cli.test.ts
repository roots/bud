import {join} from 'node:path'

import {paths} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {beforeEach, describe, expect, it} from 'vitest'

const exampleProjectDir = join(paths.root, `examples`, `react`)
const tmpProjectDir = join(paths.root, `storage`, `cli`)

describe.skip(`cli`, () => {
  beforeEach(async () => {
    try {
      await fs.removeAsync(tmpProjectDir)
      await fs.copyAsync(exampleProjectDir, tmpProjectDir)
      await fs.writeAsync(join(tmpProjectDir, `yarn.lock`), ``)
      await execa(
        `yarn`,
        [`install`, `--registry=http://localhost:4873`],
        {
          cwd: tmpProjectDir,
        },
      )
    } catch (error) {
      throw error
    }
  })

  it(`should run bud build command`, async () => {
    const {stderr, stdout} = await execa(`yarn`, [`bud`, `build`], {
      cwd: tmpProjectDir,
    })

    const lines = stdout
      .split(`\n`)
      .map(ln => ln.trim())
      .filter(Boolean)

    expect(lines[0]).toMatch(/◉  @examples\/react .*/)
    expect(lines[1]).toMatch(/|/)
    expect(lines[2]).toMatch(/├─ entrypoints/)
    expect(lines[3]).toMatch(/│ └─ app/)
    expect(lines[4]).toMatch(/│   ├─ js\/runtime.js .*/)
    expect(lines[5]).toMatch(/│   ├─ js\/.*/)
    expect(lines[6]).toMatch(/│   ├─ css\/app.css .*/)
    expect(lines[7]).toMatch(/│   └─ js\/app.js .*/)

    expect(stderr).toMatchInlineSnapshot(`""`)
  })

  it(`should run bud doctor command`, async () => {
    const {stderr, stdout} = await execa(`yarn`, [`bud`, `doctor`], {
      cwd: tmpProjectDir,
    })

    expect(stdout).toMatchInlineSnapshot(`
      "Checking configuration...

      ✅ configuration is valid

      Checking dependencies...

      ✅ dependencies synced"
    `)
    expect(stderr).toMatchInlineSnapshot(`""`)
  })

  it(`should run bud upgrade command`, async () => {
    const {stdout} = await execa(`yarn`, [`bud`, `upgrade`], {
      cwd: tmpProjectDir,
    })

    expect(stdout).toMatchInlineSnapshot(`
      "Dependencies upgraded in \`package.json\`.
      Run \`yarn install\` or \`npm install\` to install.

      "
    `)
  })
})
