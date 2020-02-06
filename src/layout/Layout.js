import React from 'react';
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
        </>
    );
}

export default Layout;