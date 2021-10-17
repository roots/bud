import type {SetOptional} from 'type-fest'
export type {SetOptional}

import {Options as FrameworkOptions} from '@roots/bud-framework'
export {FrameworkOptions}

/**
 * {@link Bud} constructor property overrides
 *
 * @core @public
 */
export interface Options
  extends SetOptional<FrameworkOptions, 'name'> {}
