import {join} from 'node:path'
import {test, expect} from 'vitest'
import fs from 'fs-jetpack'
import {execa} from 'execa'
import {paths} from '@repo/constants'

test('--runtime', async () => {
  await fs.removeAsync(
    join(
      paths.root,
      'sources/@roots/bud/test/cli-flag-runtime/project/dist',
    ),
  )

  await execa('yarn', [
    'workspace',
    '@tests/bud-runtime-flag',
    'run',
    'bud',
    'build',
  ])

  expect(
    await fs.existsAsync(
      join(
        paths.root,
        'sources/@roots/bud/test/cli-flag-runtime/project/dist/js/runtime.js',
      ),
    ),
  ).toBe(`file`)

  await execa('yarn', [
    'workspace',
    '@tests/bud-runtime-flag',
    'run',
    'bud',
    'build',
    '--runtime',
  ])

  expect(
    await fs.existsAsync(
      join(
        paths.root,
        'sources/@roots/bud/test/cli-flag-runtime/project/dist/js/runtime.js',
      ),
    ),
  ).toBe(`file`)

  await execa('yarn', [
    'workspace',
    '@tests/bud-runtime-flag',
    'run',
    'bud',
    'build',
    '--no-runtime',
  ])

  expect(
    await fs.existsAsync(
      join(
        paths.root,
        'sources/@roots/bud/test/cli-flag-runtime/project/dist/js/runtime.js',
      ),
    ),
  ).toBe(false)
})
