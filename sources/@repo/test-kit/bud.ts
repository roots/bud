import {jest} from '@jest/globals'
import {paths} from '@repo/constants'
import Bud from '@roots/bud'
import {factory as makeInstance} from '@roots/bud/factory'
import type {Compiler, Config, Server} from '@roots/bud-framework'
import {join} from 'node:path'
import type {Configuration, MultiCompiler} from 'webpack'

export const repoPath = (...path: Array<string>) =>
  join(paths.root, ...(path ?? []))

export const mockProject = {
  path: repoPath(`tests`, `util`, `project`),
}

let compile = jest.fn(async function () {
  this.config = await this.app.build.make()
  return {} as MultiCompiler
})

let implementation = jest.fn().mockImplementation(config => {})

let compiler: (app: any) => Compiler.Service = app => ({
  _app: app,
  app: app,
  callback: () => null,
  config: {} as Configuration[],
  compile,
  implementation,
  instance: {} as MultiCompiler,
  isMock: true,
  stats: {},
  handleStats: () => null,
  onError: () => null,
})

let server: (app: any) => Server.Service = app =>
  ({
    app,
    run: async function () {
      await this.app.compiler.compile()
    },
  } as Server.Service)

let run = jest.fn(async function () {
  await this.compiler.compile()
})

export const factory = async (
  overrides?: Partial<Config.Context>,
  useConfig = false,
): Promise<Bud> => {
  process.env.BUD_TEST_ENV = `true`

  const bud = await makeInstance(
    {
      basedir: mockProject.path,
      ...(overrides ?? {}),
      args: {
        ...(overrides?.args ?? {}),
      },
    },
    true,
    !useConfig,
  )

  bud.compiler = compiler(bud)
  bud.compiler.compile = bud.compiler.compile.bind(bud.compiler)

  bud.run = run.bind(bud)
  bud.server = server(bud)
  bud.server.run = bud.server.run.bind(bud.server)

  return bud
}

export {Bud}
