import {describe} from '@jest/globals'

import * as css from './e2e.css'
import * as js from './e2e.script'

describe('html output of examples/babel', css.test)
describe('html output of examples/basic', js.test)
