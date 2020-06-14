import cli from './cli/signature'

import React from 'react'
import {render} from 'ink'
import Budpack from './cli'

render(React.createElement(Budpack, {cli}))