import React from 'react'
import {render} from 'ink'
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
