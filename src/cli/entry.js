import cli from './../src/cli/signature'

import React from 'react'
import {render} from 'ink'
import Budpack from './index'

module.exports = render(React.createElement(Budpack, {cli}))
