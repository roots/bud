/* eslint-disable no-console */
import {select} from '@wordpress/data'
import {
  registerFormatType,
  unregisterFormatType,
} from '@wordpress/rich-text'

export interface Props {
  name: string
  tagName: string
  className: string
  title: string
  edit: CallableFunction
}

export const isRegistered = (name: string) =>
  select(`core/rich-text`)
    .getFormatTypes()
    .some(({name: registered}) => registered === name)

export const register = ({name, ...settings}: Props) => {
  if (!settings) {
    console.error(
      `@roots/wordpress-hmr: format settings are required`,
      `tried to register`,
      name,
    )
  }

  if (!name) {
    console.error(
      `@roots/wordpress-hmr: format name is required`,
      `tried to register`,
      settings,
    )
  }

  if (!name || !settings) return

  isRegistered(name) && unregister({name})
  registerFormatType(name, {name, ...settings})
}

export const unregister = ({name}) => {
  if (!name) return

  unregisterFormatType(name)
}
