import React from 'react';
import Menu from '../containers/Menu';

import Cell from '../components/Grid/Cell';
import './style.css';

const Layout = props => (
    <React.Fragment>
        <Menu />
        <Cell />
    </React.Fragment>
);

export default Layout;