import {path} from '@repo/constants'
import {execa} from 'execa'
import fs from 'fs-jetpack'
import {describe, expect, it} from 'vitest'

describe(`@roots/browserslist-config`, async () => {
  describe(`@roots/browserslist-config/default`, async () => {
    await execa(`yarn`, [`bud`, `build`], {
      cwd: path(
        `sources/@roots/browserslist-config/test/__fixtures__/default`,
      ),
    })

    it(`should compile as expected`, async () => {
      expect(
        await fs.readAsync(
          path(
            `sources/@roots/browserslist-config/test/__fixtures__/default/dist/css/main.css`,
          ),
        ),
      ).toMatchSnapshot()
    })
  })

  describe(`@roots/browserslist-config/last-2-versions`, async () => {
    await execa(`yarn`, [`bud`, `build`], {
      cwd: path(
        `sources/@roots/browserslist-config/test/__fixtures__/last-2-versions`,
      ),
    })

    it(`should compile as expected`, async () => {
      expect(
        await fs.readAsync(
          path(
            `sources/@roots/browserslist-config/test/__fixtures__/last-2-versions/dist/css/main.css`,
          ),
        ),
      ).toMatchSnapshot()
    })
  })

  describe(`@roots/browserslist-config/last-3-versions`, async () => {
    await execa(`yarn`, [`bud`, `build`], {
      cwd: path(
        `sources/@roots/browserslist-config/test/__fixtures__/last-3-versions`,
      ),
    })

    it(`should compile as expected`, async () => {
      expect(
        await fs.readAsync(
          path(
            `sources/@roots/browserslist-config/test/__fixtures__/last-3-versions/dist/css/main.css`,
          ),
        ),
      ).toMatchSnapshot()
    })
  })

  describe(`@roots/browserslist-config/wordpress`, async () => {
    await execa(`yarn`, [`bud`, `build`], {
      cwd: path(
        `sources/@roots/browserslist-config/test/__fixtures__/wordpress`,
      ),
    })

    it(`should compile as expected`, async () => {
      expect(
        await fs.readAsync(
          path(
            `sources/@roots/browserslist-config/test/__fixtures__/wordpress/dist/css/main.css`,
          ),
        ),
      ).toMatchSnapshot()
    })
  })
})
