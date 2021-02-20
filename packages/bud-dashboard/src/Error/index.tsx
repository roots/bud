import {React, render} from '@roots/bud-support'
import {Component} from './Component'

export const Error = (body, title) => {
  render(
    <Component title={title ?? 'Error'} body={body ?? ''} />,
  )

  process.exit()
}
