import React from 'react'

export const Component = ({children, cite, src}) => {
  return (
    <blockquote>
      <p>{children}</p>
      <cite>
        <span>
          &mdash; <a href={src ?? `#`}>{cite}</a>
        </span>
      </cite>
    </blockquote>
  )
}
