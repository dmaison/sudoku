import React from 'react';
import Menu from '../containers/Menu';
import Grid from '../containers/Grid';
import './style.css';

const Layout = props => (
    <React.Fragment>
        <Menu />
        <Grid />
    </React.Fragment>
);

export default Layout;