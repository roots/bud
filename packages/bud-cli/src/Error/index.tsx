import {React, render} from '@roots/bud-support'
import {Error as Component} from '../containers/Error'

declare interface Error {
  (body?: string, title?: string, fatal?: boolean): void
}

const Error: Error = function (
  body,
  title,
  fatal = true,
): string {
  const error = render(
    <Component title={title ?? 'Error'} body={body} />,
  )

  if (fatal) {
    process.exit(1)
  }

  return error.toString()
}

export {Error}
