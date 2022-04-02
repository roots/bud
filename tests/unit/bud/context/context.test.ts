import {Bud, factory} from '@repo/test-kit/bud'

describe.only('bud.path', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  it('has expected context.disk', () => {
    expect(bud.context.disk.config).toStrictEqual({
      '.eslintrc.js': expect.stringContaining('project/.eslintrc.js'),
      'bud.config.js': expect.stringContaining('project/bud.config.js'),
      'docker-compose.yml': expect.stringContaining(
        'project/docker-compose.yml',
      ),
      'package.json': expect.stringContaining('project/package.json'),
      'tailwind.config.js': expect.stringContaining(
        'project/tailwind.config.js',
      ),
      'tsconfig.json': expect.stringContaining('project/tsconfig.json'),
    })
  })
})
