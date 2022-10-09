import {jest} from '@jest/globals'

import bud from './bud'
import logger from './logger'

const mockExtension = {
  logger,
  disable: jest.fn(),
  enable: jest.fn(),
  setOptions: jest.fn(),
  getOptions: jest.fn(),
  setOption: jest.fn(),
}

jest.unstable_mockModule(`@roots/bud`, () => ({default: bud}))

const mock = jest.fn().mockImplementation(async () => {
  await import(`@roots/bud`)

  const extensions = {
    app: bud,
    logger,
    add: jest.fn(() => {}),
    get: jest.fn(() => mockExtension),
  }

  return extensions
})

export default mock
export {mockExtension}
