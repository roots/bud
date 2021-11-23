import React from 'react'

const Callout = ({children}) => (
  <span
    style={{
      display: 'inline-block',
      fontSize: '1.4rem',
      paddingBottom: '1.4rem',
      fontStyle: 'italic',
    }}
  >
    {children}
  </span>
)

export {Callout}
