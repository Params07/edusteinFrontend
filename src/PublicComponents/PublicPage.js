import React from 'react'
import Home from './NavComponents/Home'
import Program from './NavComponents/Program'
import About from './NavComponents/About'
import Contact from './NavComponents/Contact'
import Register from './NavComponents/Register'
import Nav from './Nav.js'
import { GlobalStateProvider } from './UseContextComponents/GlobalStateProvider';


const PublicPage = () => {
  return (
    <GlobalStateProvider>

    <Nav/>
    <Home/>
    <Program/>
    <About/>
    <Contact/>
    <Register/>
    </GlobalStateProvider>
  )
}

export default PublicPage;