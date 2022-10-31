import {vi} from 'vitest'

import bud from './bud'
import logger from './logger'

const mockExtension = {
  logger,
  disable: vi.fn(),
  enable: vi.fn(),
  setOptions: vi.fn(),
  getOptions: vi.fn(),
  setOption: vi.fn(),
}

vi.mock(`@roots/bud`, () => ({default: bud}))

const mock = vi.fn().mockImplementation(async () => {
  await import(`@roots/bud`)

  const extensions = {
    app: bud,
    logger,
    add: vi.fn(() => {}),
    get: vi.fn(() => mockExtension),
  }

  return extensions
})

export default mock
export {mockExtension}
