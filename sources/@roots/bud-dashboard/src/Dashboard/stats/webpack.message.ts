import {boxen} from '@roots/bud-support'

export const make = ({message, title}, color) =>
  boxen(`\n${message}`, {
    title: `${title ?? 'error'}`,
    margin: {
      top: 0,
      bottom: 1,
      left: 0,
      right: 0,
    },
    padding: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    borderColor: color,
  })

export const mapMessages = (messages, color) =>
  messages.map(message => make(message, color))
