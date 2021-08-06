/**
 * `@roots/bud` is a frontend build framework combining the best parts of Symfony Encore and Laravel Mix
 *
 * @remarks
 * The `@roots/sage` extension preconfigures the Bud Framework for the Sage WordPress theme.
 *
 * @packageDocumentation
 */

import {sage} from './sage'

export default sage
export const {name, boot} = sage

export type {Sage} from './sage/interface'
