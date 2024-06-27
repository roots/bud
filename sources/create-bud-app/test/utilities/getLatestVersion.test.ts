import {describe, expect, it, vi} from 'vitest'

import getLatestVersion from '../../src/utilities/getLatestVersion'

describe(`create-bud-app/utilities/getLatestVersion`, async () => {
  it(`should return a string`, async () => {
    expect(await getLatestVersion()).toMatch(/^[0-9]+\.[0-9]+\.[0-9]+$/)
  })
})
