import * as box from './box.factory'

export const make = (
  {message, title}: {message: string; title?: string},
  color: string,
) => box.make(title ?? 'error', message, {color})

export const mapMessages = (
  messages: Array<{message: string; title?: string}>,
  color: string,
) => messages.map(message => make(message, color))
