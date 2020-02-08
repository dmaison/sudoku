import React from 'react'
import Controls from '../containers/Controls'
import Details from '../containers/Details'
import Grid from '../containers/Grid'
import Menu from '../containers/Menu'
import Win from '../containers/Win'
import './style.css'

const Layout = () => (
    <>
        <Win />
        <Menu />
        <Details />        
        <Grid />
        <Controls />        
    </>
);

export default Layout;