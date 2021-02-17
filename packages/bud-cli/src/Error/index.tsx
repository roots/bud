import {React, render} from '@roots/bud-support'
import {Error as Component} from '../containers/Error'

declare interface Error {
  (body?: string, title?: string): void
}

const Error: Error = function (body, title): void {
  render(
    <Component title={title ?? 'Error'} body={body ?? ''} />,
  )

  process.exit()
}

export {Error}
