import React from 'react';
import Button from '../../components/Menu/Button';
import './style.css';

/**
 * @name Menu
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const Menu = () => (
    <nav>
        <Button icon="edit" hoverText="Toggle Note Mode (N)" />
        <Button icon="sync" hoverText="New Game" />
        <Button icon="cog" hoverText="Change Difficulty" />
        <Button icon="save" hoverText="Save (S)" />
    </nav>
)

export default Menu;