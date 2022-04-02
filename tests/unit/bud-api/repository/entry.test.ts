import {Bud, factory} from '@repo/test-kit/bud'
import {EntryObject} from '@roots/bud-framework/entry'

describe('bud.entry', function () {
  let bud: Bud

  beforeAll(async () => {
    bud = await factory()
  })

  beforeEach(() => {
    bud.hooks.on('build.entry', {})
  })

  it('sets an entrypoint using (string, string) fn signature', async () => {
    bud.entry('app', 'scripts/app.js')
    await bud.build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js'],
      },
    })
  })

  it('sets an entrypoint using (string, string) fn signature with globbing', async () => {
    bud.entry('app', '**/app.{css,js}')

    await bud.build.make()

    expect((bud.build.config.entry as any).app.import).toContain(
      'scripts/app.js',
    )
    expect((bud.build.config.entry as any).app.import).toContain(
      'styles/app.css',
    )
  })

  it('sets an entrypoint using (string, string[]) fn signature', async () => {
    bud.entry('app', ['scripts/app.js', 'styles/app.css'])

    await bud.build.make()

    expect(bud.build.config.entry).toStrictEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets an entrypoint using (string, string[]) fn signature with globbing', async () => {
    bud.entry('app', ['**/app.js', '**/editor.css'])

    await bud.build.make()

    expect(bud.build.config.entry).toStrictEqual({
      app: {
        import: ['scripts/app.js', 'styles/editor.css'],
      },
    })
  })

  it('sets a single entrypoint using k, v fn signature', async () => {
    bud.entry({
      app: ['scripts/app.js', 'styles/app.css'],
    })

    await bud.build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
    })
  })

  it('sets a single entrypoint using k, v fn signature with globbing', async () => {
    bud.entry({
      app: ['**/app.js', 'styles/*.css'],
    })
    const config = await bud.build.make()

    expect(config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css', 'styles/editor.css'],
      },
    })
  })

  it('sets multiple entrypoints using k, v fn signature', async () => {
    bud.entry({
      app: ['scripts/app.js', 'styles/app.css'],
      editor: ['styles/editor.css'],
    })

    await bud.build.make()

    expect(bud.build.config.entry).toEqual({
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
      editor: {
        import: ['styles/editor.css'],
      },
    })
  })

  it('supports dependOn', async () => {
    const input = {
      app: {
        import: ['scripts/app.js', 'styles/app.css'],
      },
      editor: {
        import: ['styles/editor.css'],
        dependOn: ['app'],
      },
    }

    bud.entry(input)

    await bud.build.make()

    expect(bud.build.config.entry).toEqual(input)
  })

  it('supports managing runtime', async () => {
    const input: Record<string, EntryObject> = {
      app: {
        import: ['scripts/main.js'],
        dependOn: ['entry', 'entry-2'],
      },
      entry: {
        import: ['scripts/entry.js', 'styles/entry.css'],
        runtime: 'main',
      },
      ['entry-2']: {
        import: ['scripts/entry-2.js', 'styles/entry-2.css'],
        runtime: 'main',
      },
    }

    bud.entry(input)

    await bud.build.make()

    expect(bud.build.config.entry).toEqual(input)
  })
})
