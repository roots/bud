import React from 'react'
import styled from '@emotion/styled'
import logo from './logo.svg'

const Header = styled.div`
  border-radius: 50px;
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
