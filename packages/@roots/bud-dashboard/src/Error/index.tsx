import {React, render} from '@roots/bud-support'
import {Component} from './Component'

export const Error: CallableFunction = (
  body: string,
  title: string,
) => {
  render(
    <Component title={title ?? 'Error'} body={body ?? ''} />,
  )

  process.exit()
}
