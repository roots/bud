import React from 'react'
import {render} from 'ink'
import {Error as ErrorContainer} from './containers/Error'

const Error = function (body?: string, title?: string): void {
  render(<ErrorContainer title={title ?? 'Error'} body={body} />)
  process.exit(1)
}

export {Error}
