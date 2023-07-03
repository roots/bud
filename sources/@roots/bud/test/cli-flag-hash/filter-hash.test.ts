import {join} from 'node:path'
import {test, expect} from 'vitest'
import fs from 'fs-jetpack'
import {execa} from 'execa'
import {paths} from '@repo/constants'

test('--hash', async () => {
  await fs.removeAsync(
    join(paths.root, 'sources/@roots/bud/test/cli-flag-hash/project/dist'),
  )

  await execa('yarn', [
    'workspace',
    '@tests/bud-hash-flag',
    'run',
    'bud',
    'build',
    '--hash',
  ])

  expect(
    await fs.existsAsync(
      join(
        paths.root,
        'sources/@roots/bud/test/cli-flag-hash/project/dist/js/main.js',
      ),
    ),
  ).toBe(false)

  await execa('yarn', [
    'workspace',
    '@tests/bud-hash-flag',
    'run',
    'bud',
    'build',
  ])

  expect(
    await fs.existsAsync(
      join(
        paths.root,
        'sources/@roots/bud/test/cli-flag-hash/project/dist/js/main.js',
      ),
    ),
  ).toBe(`file`)
})
