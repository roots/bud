import {Bud, factory} from '@repo/test-kit/bud'

describe('unit', function () {
  describe('context', () => {
    let bud: Bud

    beforeAll(async () => {
      bud = await factory()
    })

    it('has expected context.config', () => {
      expect(bud.context.config).toEqual(
        expect.objectContaining({
          '.eslintrc.js': expect.stringMatching(/project\/.eslintrc\.js$/),
          'bud.config.cjs': expect.stringMatching(
            /project\/bud\.config\.cjs$/,
          ),
          'docker-compose.yml': expect.stringMatching(
            /project\/docker-compose\.yml$/,
          ),
          'package.json': expect.stringContaining('project/package.json'),
          'tailwind.config.js': expect.stringContaining(
            'project/tailwind.config.js',
          ),
          'tsconfig.json': expect.stringContaining(
            'project/tsconfig.json',
          ),
        }),
      )
    })
  })
})
