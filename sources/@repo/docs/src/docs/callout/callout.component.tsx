import React from 'react'

const style = {
  display: `inline-block`,
  fontSize: `1.4rem`,
  paddingBottom: `1.4rem`,
  fontStyle: `italic`,
}

export const Component = ({children}) => (
  <span style={style}>{children}</span>
)
