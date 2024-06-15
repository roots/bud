import setup from '@repo/test-kit/setup'
import {filesystem as fs} from '@roots/bud-support/filesystem'
import {describe, expect, it} from 'vitest'

describe(`examples/webpack-plugin`, () => {
  it(`should compile assets as expected`, async () => {
    const test = setup({
      buildCommand: [
        `yarn`,
        [
          `bud`,
          `--basedir`,
          `examples/webpack-plugin`,
          `build`,
          `--debug`,
          `--force`,
        ],
      ],
      integrationBuildCommand: [
        `npx`,
        [`bud`, `build`, `--debug`, `--force`],
      ],
      label: `@examples/webpack-plugin`,
    })

    await test.install()
    await test.build()

    const debug = await fs.read(
      test.getPath(
        `.storage`,
        `@examples`,
        `webpack-plugin`,
        `debug`,
        `profile.yml`,
      ),
    )

    const pluginLoaded = (name: string) => (loaded: any) =>
      loaded.label === name

    expect(
      Object.values(debug.loaded).some(pluginLoaded(`inline-plugin`)),
    ).toBeTruthy()
    expect(
      Object.values(debug.loaded).some(pluginLoaded(`array-plugin-1`)),
    ).toBeTruthy()
    expect(
      Object.values(debug.loaded).some(pluginLoaded(`array-plugin-2`)),
    ).toBeTruthy()

    expect(
      await fs.read(test.getPath(`.storage`, `inline-plugin-output`)),
    ).toEqual(`inline-plugin-test-success`)

    expect(await fs.read(test.getPath(`build.stdout.log`))).toMatch(
      /WebpackPlugin applied!\ninline-plugin applied!\narray-plugin-1 applied!\narray-plugin-2 applied!/,
    )
  })
})
