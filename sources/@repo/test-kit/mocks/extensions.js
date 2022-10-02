import {jest} from '@jest/globals'

import bud from './bud'
import logger from './logger'

jest.unstable_mockModule(`@roots/bud`, () => ({default: bud}))

const mock = jest.fn().mockImplementation(async () => {
  await import(`@roots/bud`)
  const extensions = {
    app: bud,
    logger,
  }

  return extensions
})

export default mock
