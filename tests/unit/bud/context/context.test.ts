import {Bud, factory} from '@repo/test-kit/bud'

describe(`unit`, function () {
  describe(`context`, () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    it(`has expected context.config`, () => {
      expect(bud.context.config).toEqual(
        expect.objectContaining({
          '.eslintrc.js': expect.any(Object),
          'bud.config.mjs': expect.any(Object),
          'docker-compose.yml': expect.any(Object),
          'package.json': expect.any(Object),
          'tailwind.config.js': expect.any(Object),
          'tsconfig.json': expect.any(Object),
          'webpack.config.mjs': expect.any(Object),
        }),
      )
    })
  })
})
