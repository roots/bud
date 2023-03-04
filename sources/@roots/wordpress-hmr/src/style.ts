import {
  BlockStyle as Style,
  registerBlockStyle,
  unregisterBlockStyle,
} from '@wordpress/blocks'

export type {Style}

export type Registry = {
  [key: string]: Style
}

export const unregister = (name: string, style: Style) =>
  unregisterBlockStyle(name, style.label)

export const register = (name: string, style: Style) =>
  registerBlockStyle(name, style)
