import {FunctionComponent} from 'react'

export declare const Error: Error.Component

declare namespace Error {
  type Component = FunctionComponent<{
    title?: string
    body: string
  }>
}
