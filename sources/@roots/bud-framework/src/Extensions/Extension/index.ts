import {Modules, Plugins} from '../..'

/**
 * Registered extension names
 *
 * @remarks
 * Extension names can be declared by overloading
 * the {@link Modules} and {@link Plugins} interfaces
 *
 * @public
 */
export type Name = `${(keyof Modules & string) | (keyof Plugins & string)}`

export {Controller} from './controller.interface'
export {CompilerPlugin} from './compiler-plugin.interface'
export {Module} from './module.interface'
