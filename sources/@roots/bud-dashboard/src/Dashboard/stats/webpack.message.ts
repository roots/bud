import * as box from './box.factory'

export const make = (
  {message, title}: {message: string; title?: string},
  color: string,
) =>
  box.make(title ?? 'error', message, {
    margin: {
      top: 0,
      bottom: 1,
      left: 0,
      right: 0,
    },
    padding: {
      top: 0,
      bottom: 0,
      left: 1,
      right: 1,
    },
    borderColor: color,
  })

export const mapMessages = (
  messages: Array<{message: string; title?: string}>,
  color: string,
) => messages.map(message => make(message, color))
