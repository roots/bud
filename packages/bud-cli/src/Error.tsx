import React from 'react'
import {render} from 'ink'
import {Error as Component} from './containers/Error'

declare interface Error {
  (body?: string, title?: string): void
}

const Error: Error = function (body?, title?): void {
  render(<Component title={title ?? 'Error'} body={body} />)
  process.exit(1)
}

export {Error}
