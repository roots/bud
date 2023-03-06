import {
  BlockVariation,
  registerBlockVariation,
  unregisterBlockVariation,
} from '@wordpress/blocks'

export interface Variant extends BlockVariation {
  block: string
}

export type Registry = {
  [key: string]: Variant
}

export const unregister = ({block, ...variant}: Variant) =>
  unregisterBlockVariation(block, variant.name)

export const register = ({block, ...variant}: Variant) =>
  registerBlockVariation(block, variant)
