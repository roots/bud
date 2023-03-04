import {
  FormatConfiguration,
  registerFormatType,
  unregisterFormatType,
} from '@wordpress/rich-text'

export interface Props extends FormatConfiguration {
  name: string
}

export const register = ({name, ...settings}: Props) =>
  registerFormatType(name, settings)

export const unregister = ({name}) => unregisterFormatType(name)
