import {helper} from '../util/integration'

const suite = helper(
  'wordpress-theme',
  'examples/wordpress-theme',
)

jest.setTimeout(60000)

describe(suite.name, () => {
  test.todo('wordpress-theme tests')
})
