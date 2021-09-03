import type {Framework} from '@roots/bud-framework'

export const mocks = (function () {
  return {
    /**
     * Framework mock
     */
    bud: {
      name: 'bud',
      mode: 'production',
      close: jest
        .fn()
        .mockImplementation((cb: CallableFunction) => {}),
      dashboard: {
        render: jest
          .fn()
          .mockImplementation(
            (body: string, ...args: any) => {},
          ),
      },
      entry: jest.fn().mockImplementation(function () {
        return this
      }),
      project: {
        has: jest.fn().mockImplementation((key: string) => true),
        getValues: jest
          .fn()
          .mockImplementation((key: string) => []),
        hasPeerDependency: jest
          .fn()
          .mockImplementation((name: string): boolean => true),
        peers: {
          install: jest.fn().mockImplementation(() => {}),
        },
      },
      use: jest.fn().mockImplementation(function (name: string) {
        return this
      }),
      tap: jest
        .fn()
        .mockImplementation(function (cb: CallableFunction) {
          return this
        }),
    } as unknown as Framework,

    /**
     * User conf mock
     */
    conf: [`${__dirname}/bud.config.js`],
  }
})()
