import {Babel} from './Babel'
import {Config} from './Config'
import {DEFAULT_PLUGINS, DEFAULT_PRESETS} from './constants'
import type {BabelConfig, BabelExtension} from './interface'

export {Config}

export {Babel}
export default Babel
export const {name, register, boot} = Babel

export {DEFAULT_PLUGINS, DEFAULT_PRESETS}

export type {BabelExtension, BabelConfig}
