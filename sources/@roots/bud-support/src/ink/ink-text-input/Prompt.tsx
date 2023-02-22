// @ts-nocheck

import chalk from 'chalk'
import Ink from 'ink'
import React, {useEffect, useState} from 'react'

import {highlight} from '../../highlight'

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

const Prompt = ({
  value: originalValue,
  placeholder = ``,
  focus = true,
  mask,
  showCursor = true,
  onChange,
  onSubmit,
}: Props) => {
  const [{cursorOffset}, setState] = useState({
    cursorOffset: (originalValue || ``).length,
    cursorWidth: 0,
  })

  useEffect(() => {
    setState(previousState => {
      if (!focus || !showCursor) {
        return previousState
      }

      const newValue = originalValue || ``

      if (previousState.cursorOffset > newValue.length - 1) {
        return {
          cursorOffset: newValue.length,
          cursorWidth: 0,
        }
      }

      return previousState
    })
  }, [originalValue, focus, showCursor])

  const value = mask ? mask.repeat(originalValue.length) : originalValue
  let renderedPlaceholder = placeholder
    ? chalk.grey(placeholder)
    : undefined

  Ink.useInput(
    (input, key) => {
      if (
        key.upArrow ||
        key.downArrow ||
        (key.ctrl && input === `c`) ||
        key.tab ||
        (key.shift && key.tab)
      ) {
        return
      }

      if (key.return) {
        if (onSubmit) {
          onSubmit(originalValue)
        }

        return
      }

      let nextCursorOffset = cursorOffset
      let nextValue = originalValue
      let nextCursorWidth = 0

      if (key.leftArrow) {
        if (showCursor) {
          nextCursorOffset--
        }
      } else if (key.rightArrow) {
        if (showCursor) {
          nextCursorOffset++
        }
      } else if (key.backspace || key.delete) {
        if (cursorOffset > 0) {
          nextValue =
            originalValue.slice(0, cursorOffset - 1) +
            originalValue.slice(cursorOffset, originalValue.length)

          nextCursorOffset--
        }
      } else {
        nextValue =
          originalValue.slice(0, cursorOffset) +
          input +
          originalValue.slice(cursorOffset, originalValue.length)

        nextCursorOffset += input.length

        if (input.length > 1) {
          nextCursorWidth = input.length
        }
      }

      if (cursorOffset < 0) {
        nextCursorOffset = 0
      }

      if (cursorOffset > originalValue.length) {
        nextCursorOffset = originalValue.length
      }

      setState({
        cursorOffset: nextCursorOffset,
        cursorWidth: nextCursorWidth,
      })

      if (nextValue !== originalValue) {
        onChange(nextValue)
      }
    },
    {isActive: focus},
  )

  return (
    <Ink.Text>
      {placeholder
        ? value.length > 0
          ? highlight(`async (bud: Bud) => ${value}`)
          : renderedPlaceholder
        : highlight(`async (bud: Bud) => ${value}`)}
    </Ink.Text>
  )
}

export {Prompt}
