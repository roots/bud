/* eslint-disable no-console */
/* global __resourceQuery */
/* global module */

import {client} from './client.js'

client(__resourceQuery, module.hot)
