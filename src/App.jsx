import React from 'react'
import {Outlet} from 'react-router-dom'
import styled from 'styled-components'
import Header from './components/header/Header.jsx'

const Main = styled.div`
    width: 1110px;
    margin: 0 auto;
`
const App = ()=> {
  return (
    <Main>
      <Header />
      <Outlet />
    </Main>
  )
}

export default App
