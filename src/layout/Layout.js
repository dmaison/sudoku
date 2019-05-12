import React from 'react';
import Details from '../containers/Details';
import Grid from '../containers/Grid';
import Menu from '../containers/Menu';
import './style.css';

const Layout = () => (
    <React.Fragment>
        <Menu />
        <Details />        
        <Grid />
    </React.Fragment>
);

export default Layout;