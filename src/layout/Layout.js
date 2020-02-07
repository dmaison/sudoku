import React from 'react';
import Controls from '../containers/Controls';
import Details from '../containers/Details';
import Grid from '../containers/Grid';
import Menu from '../containers/Menu';
import './style.css';

const Layout = () => {
    return (
        <>
            <Menu />
            <Details />        
            <Grid />
            <Controls />
        </>
    );
}

export default Layout;