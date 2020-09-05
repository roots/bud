import {Container, FileContainer} from '../framework/container'
import {WebpackRule} from '../externals/webpack'
import {Bud} from '../bud'

export type Args = Container
export type Configs = FileContainer
export type Environment = Container
export type Features = Container
export type Flags = Container
export type Options = Container

export type Directory = string
export type Paths = Container

export type Use = (bud: Bud) => WebpackRule
