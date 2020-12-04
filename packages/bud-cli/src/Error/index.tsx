import React from 'react'
import {render} from 'ink'
import {Error as Component} from '../containers/Error'
import {Instance} from 'ink'

declare interface Error {
  (body?: string, title?: string, fatal?: boolean): void
}

const Error: Error = function (
  body,
  title,
  fatal = true,
): Instance {
  const instance = render(
    <Component title={title ?? 'Error'} body={body} />,
  )

  fatal && process.exit(1)

  return instance
}

export {Error}
