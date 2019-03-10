import React from 'react'
import { createGlobalStyle } from 'styled-components'

import Repositories from './Repositories'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-family: 'Open Sans', sans-serif;
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: #F5F5F5;
  }
`

const App = () => (
  <>
    <GlobalStyle />
    <Repositories />
  </>
)

export default App
