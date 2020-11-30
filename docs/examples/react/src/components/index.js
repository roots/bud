import React from 'react'

const style = {
  alignItems: 'center',
  background: 'black',
  color: 'white',
  display: 'flex',
  fontFamily: 'sans-serif',
  height: '100vh',
  justifyContent: 'center',
  letterSpacing: '0.2em',
  textAlign: 'center',
  textTransform: 'uppercase',
  width: '100vw',
}

export const App = () => {
  return (
    <div style={style}>
      {`${appName}`}
    </div>
  )
}
