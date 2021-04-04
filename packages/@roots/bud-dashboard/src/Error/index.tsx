import {
  React,
  render,
  FunctionComponent,
} from '@roots/bud-support'
import {Component} from './Component'

export const Error = (body, title) => {
  render(
    <Component title={title ?? 'Error'} body={body ?? ''} />,
  )

  process.exit()
}

declare namespace Error {
  type Component = FunctionComponent<{
    title?: string
    body: string
  }>
}
