import {select} from '@wordpress/data'
import {
  FormatConfiguration,
  registerFormatType,
  unregisterFormatType,
} from '@wordpress/rich-text'

export interface Props extends FormatConfiguration {
  name: string
}

export const isRegistered = (name: string) => {
  return select(`core/rich-text`)
    .getFormatTypes()
    .some(({name: registered}) => registered === name)
}

export const register = ({name, ...settings}: Props) => {
  if (!name || !settings) return
  isRegistered(name) && unregister({name})
  registerFormatType(name, settings)
}

export const unregister = ({name}) => {
  if (!name) return
  unregisterFormatType(name)
}
