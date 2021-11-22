import type {Framework} from '@roots/bud-framework'

export const mocks = (function () {
  return {
    /**
     * Framework mock
     */
    bud: {
      /**
       * Framework name
       */
      name: 'bud',
      /**
       * Compilation mode
       */
      mode: 'production',

      /**
       * Cache mock
       */
      cache: {
        updateProfile: jest
          .fn()
          .mockImplementation((cb: CallableFunction) => {}),
      },

      /**
       * Framework shutdown mock
       */
      close: jest
        .fn()
        .mockImplementation((cb: CallableFunction) => {}),
      /**
       * Dashboard service mock
       */
      dashboard: {
        render: jest
          .fn()
          .mockImplementation(
            (body: string, ...args: any) => {},
          ),
      },
      /**
       * Api.entry mock
       */
      entry: jest.fn().mockImplementation(function () {
        return this
      }),
      /**
       * Project service mock
       */
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
      /**
       * Api.use mock
       */
      use: jest.fn().mockImplementation(function (name: string) {
        return this
      }),
      /**
       * Tap fn mock
       */
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
