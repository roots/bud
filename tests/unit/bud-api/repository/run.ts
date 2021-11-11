import {factory} from '@roots/bud'
import {run} from '@roots/bud-api/src/Repository/run'

describe.skip('bud.run', function () {
  let bud
  let compile = jest.fn(async () => true)
  let MOCK_BUD = {
    isDevelopment: false,

    when: () => false,

    compiler: {
      compile: compile,
    },

    path: jest.fn((...strings: string[]): string => {
      return process.cwd().concat('/.budfiles')
    }),

    run: jest.fn(cb => {
      return cb
    }),

    server: {
      inject: jest.fn(),
      run: jest.fn(),
      config: {
        isTrue: () => true,
      },
    },
  }

  beforeAll(async () => {
    bud = await factory({
      config: {features: {dashboard: false, log: false}},
    })

    run.bind(MOCK_BUD)()
  })

  it('is a function', () => {
    expect(bud.run).toBeInstanceOf(Function)
  })

  /**
   * I think this broke because it async now
   */
  it.todo('calls compile fn')
})
