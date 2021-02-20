import React from 'react'
import styled from '@emotion/styled'
import logo from './logo.svg'

/**
 * @emotion styled-api
 * extension: @roots/bud-emotion
 */
const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-items: space-between;
  transition: all 0.2s ease-in-out;
  transform: scale(1);

  &:hover {
    transform: scale(1.05);
    border-color: #4f69c6;
    transition: all 0.2s ease-in-out;
  }
`

export const App = () => {
  return (
    <div className="App">
      <Header className="header">
        <img src={logo} className="logo" alt="logo" />
        Edit <code>src/components/App.js</code> and save to
        reload
      </Header>
    </div>
  )
}
