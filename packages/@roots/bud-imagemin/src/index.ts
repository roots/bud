import './interface'

import {Config} from './Config'
import {extension} from './imagemin'
import {WebpackPlugin} from './WebpackPlugin'

export {extension, extension as default}

export const {name, api, register, boot} = extension

export {Config, WebpackPlugin}
