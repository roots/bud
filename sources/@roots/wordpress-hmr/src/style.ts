import {
  BlockStyle,
  registerBlockStyle,
  unregisterBlockStyle,
} from '@wordpress/blocks'

export interface Style extends BlockStyle {
  block: string
}

export type Registry = {
  [key: string]: Style
}

export const unregister = ({block, ...style}: Style) =>
  unregisterBlockStyle(block, style.name)

export const register = ({block, ...style}: Style) =>
  registerBlockStyle(block, style)
