import {render} from 'ink'
import * as React from 'react'

import {Component} from './Error'

const Error: CallableFunction = (
  body: string,
  title: string,
) => {
  render(
    <Component title={title ?? 'Error'} body={body ?? ''} />,
  )
}

export {Error}
