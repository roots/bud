import {factory} from '@roots/bud'
import {repository} from '@roots/bud-api'

const {run} = repository

const bud = factory()

const mockCompileRunFn = jest.fn()
const mockCompileFn = jest.fn(() => {
  return {
    run: mockCompileRunFn,
  }
})

const MOCK_BUD = {
  dashboard: {
    run: jest.fn(() => {
      return this
    }),
  },

  isDevelopment: false,

  when: bud.when,

  compiler: {
    compile: mockCompileFn,
  },

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

MOCK_BUD.dashboard.run.bind(MOCK_BUD)
MOCK_BUD.compiler.compile.bind(MOCK_BUD)
run.bind(MOCK_BUD)()

describe('bud.run', function () {
  it('is a function', () => {
    expect(bud.run).toBeInstanceOf(Function)
  })

  it('calls dashboard.run', () => {
    expect(MOCK_BUD.dashboard.run).toHaveBeenCalled()
  })

  it('calls compiler.compile.run', () => {
    expect(MOCK_BUD.compiler.compile).toHaveBeenCalled()
  })
})
