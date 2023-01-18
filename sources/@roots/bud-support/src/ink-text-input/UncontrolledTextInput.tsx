import React from '@roots/bud-support/react'
import type {Except} from '@roots/bud-support/type-fest'

import {TextInput} from './TextInput.js'

interface Props {
  /**
   * Text to display when `value` is empty.
   */
  placeholder?: string

  /**
   * Listen to user's input. Useful in case there are multiple input components
   * at the same time and input must be "routed" to a specific component.
   */
  focus?: boolean

  /**
   * Replace all chars and mask the value. Useful for password inputs.
   */
  mask?: string

  /**
   * Whether to show cursor and allow navigation inside text input with arrow keys.
   */
  showCursor?: boolean

  /**
   * Highlight pasted text
   */
  highlightPastedText?: boolean

  /**
   * Value to display in a text input.
   */
  value: string

  /**
   * Function to call when value updates.
   */
  onChange: (value: string) => void

  /**
   * Function to call when `Enter` is pressed, where first argument is a value of the input.
   */
  onSubmit?: (value: string) => void
}

interface UncontrolledProps extends Except<Props, 'value' | 'onChange'> {
  /**
   * Initial value.
   */
  initialValue?: string
}

export const UncontrolledTextInput: React.FC<UncontrolledProps> = ({
  initialValue = ``,
  ...props
}) => {
  const [value, setValue] = React.useState(initialValue)

  return <TextInput {...props} value={value} onChange={setValue} />
}
