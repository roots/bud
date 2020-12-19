import React from 'react'
import {render} from 'ink'
import {Error as Component} from '../containers/Error'

declare interface Error {
  (body?: string, title?: string, fatal?: boolean): void
}

const Error: Error = function (
  body,
  title,
  fatal = true,
): string {
  const error = render(
    <Component title={title ?? 'Error'} body={body} />,
  )

  if (fatal) {
    console.error(error)
    process.exit(1)
  }

  return error.toString()
}

export {Error}
