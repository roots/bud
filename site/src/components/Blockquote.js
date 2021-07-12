import React from 'react'

const Blockquote = ({children, cite, src}) => {
  return (
    <blockquote>
      <p>{children}</p>
      <cite>
        <span>
          &mdash; <a href={src ?? '#'}>{cite}</a>
        </span>
      </cite>
    </blockquote>
  )
}

export default Blockquote
