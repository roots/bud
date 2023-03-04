import {
  FormatConfiguration,
  registerFormatType,
  unregisterFormatType,
} from '@wordpress/rich-text'

export interface Props extends FormatConfiguration {
  block: string
}

export const register = ({block, ...settings}: Props) =>
  registerFormatType(block, settings)

export const unregister = ({block}) => unregisterFormatType(block)
