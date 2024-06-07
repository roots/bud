import {test, expect} from 'vitest'
import fs from 'fs-jetpack'
import {execa} from 'execa'
import {path} from '@repo/constants'

test('--entrypoints.html', async () => {
  await fs.removeAsync(
    path(
      'sources/@roots/bud/test/cli-flag-entrypoints.html/project/dist',
    ),
  )

  await execa('yarn', [
    'workspace',
    '@tests/bud-entrypoints.html-flag',
    'run',
    'bud',
    'build',
  ])

  expect(
    await fs.existsAsync(
      path(
        'sources/@roots/bud/test/cli-flag-entrypoints.html/project/dist/main.html',
      ),
    ),
  ).toBe(false)

  await execa('yarn', [
    'workspace',
    '@tests/bud-entrypoints.html-flag',
    'run',
    'bud',
    'build',
    '--entrypoints.html',
  ])

  expect(
    await fs.existsAsync(
      path(
        'sources/@roots/bud/test/cli-flag-entrypoints.html/project/dist/main.html',
      ),
    ),
  ).toBe(`file`)

  await execa('yarn', [
    'workspace',
    '@tests/bud-entrypoints.html-flag',
    'run',
    'bud',
    'build',
    '--no-entrypoints.html',
  ])

  expect(
    await fs.existsAsync(
      path(
        'sources/@roots/bud/test/cli-flag-entrypoints.html/project/dist/main.html',
      ),
    ),
  ).toBe(false)
})
