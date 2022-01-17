import type {Extension, Framework} from '@roots/bud-framework'

export type {Extension, Framework}

/**
 * Extension source interface
 *
 * @remarks
 * This interface is used to define a webpack plugin
 * or bud extension registrable with the `use` method.
 *
 * @public
 */
export type Source =
  | Extension.Module
  | Extension.CompilerPlugin
  | Extension.Module
