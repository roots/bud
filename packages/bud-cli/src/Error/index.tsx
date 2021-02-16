import {React, render} from '@roots/bud-support'
import {Error as Component} from '../containers/Error'

declare interface Error {
  (body?: string, title?: string, fatal?: boolean): void
}

const Error: Error = function (body, title, fatal = true): void {
  render(
    <Component title={title ?? 'Error'} body={body ?? ''} />,
  )
}

export {Error}
