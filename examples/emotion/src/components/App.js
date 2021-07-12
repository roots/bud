import React from 'react'
import styled from '@emotion/styled'
import logo from './logo.svg'

const Logo = styled.img`
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  height: 30vmin;
  pointer-events: none;
  margin-bottom: 2rem;
  animation: App-logo-spin infinite 20s linear;
`

export const App = () => {
  return (
    <div className="App">
      <div className="header">
        <Logo src={logo} className="logo" alt="logo" />
        Edit <code>src/components/App.js</code> and save to
        reload
      </div>
    </div>
  )
}
