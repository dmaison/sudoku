import React from 'react';
import Button from '../../components/Menu/Button';
import './style.css';

import { create, fill } from '../../utilities/grid';

/**
 * @name Grid
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const Grid = () => {

    let grid = create();
    fill( grid );

    console.log( grid )

    return (
        <main className="grid">
            
        </main>
    )
}

export default Grid;