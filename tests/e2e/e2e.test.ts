import {describe, jest} from '@jest/globals'

import * as css from './e2e.css.js'
import * as js from './e2e.script.js'

jest.setTimeout(6 * 60 * 1000)

describe('html output of examples/babel', css.test)
describe('html output of examples/basic', js.test)