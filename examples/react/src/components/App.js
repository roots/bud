import React from 'react'
import styled from '@emotion/styled'
import logo from './logo.svg'

const Header = styled.div`
  border: 10px solid white;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #4f69c6;
    transition: all 0.2s ease-in-out;
  }
`

export const App = () => {
  return (
    <div className="App">
      <Header className="header">
        <img src={logo} className="logo" alt="logo" />
        <p>
          Edit <code>src/components/App.js</code> and save to
          reload.
        </p>
      </Header>
    </div>
  )
}
