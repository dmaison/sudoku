import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'
import Breakpoints from '../../constants/breakpoints'
import ChangeDifficulty from './ChangeDifficulty'
import Load from './Load'
import NewGame from './NewGame'
import ReportBug from './ReportBug'
import Save from './Save'
import ToggleNoteMode from './ToggleNoteMode'
import Button from '../../components/Menu/Button'
import './animation.css'
import './style.css'

/**
 * @name MenuOptions
 * @function
 * @returns {JSX}
 * @description Menu items (I'm that lazy)
 */
const MenuOptions = props => (
    <React.Fragment>
        <ToggleNoteMode callback={ props.callback } />
        <NewGame callback={ props.callback } />
        <ChangeDifficulty callback={ props.callback } />
        <Save callback={ props.callback } />
        <Load callback={ props.callback } />
        <ReportBug />
    </React.Fragment>
);

MenuOptions.propTypes = {
    callback: PropTypes.func.isRequired
};

/**
 * @name Menu
 * @function
 * @returns {JSX}
 * @description Displays the menu controls for the game
 */
const Menu = () => {

    const [ open, setOpen ] = useState( false ),
    close = () => setOpen( false );

    let dropdownClasses = [ 'dropdown' ];

    if( open ) dropdownClasses.push( 'open' );

    return (
        <>
            <nav>
                <MediaQuery minDeviceWidth={ Breakpoints.laptop.min }>
                    <MenuOptions callback={ close } />
                </MediaQuery>
                <MediaQuery maxDeviceWidth={ Breakpoints.mobile.max }>
                    <Button active={ open } icon="bars" onClick={ () => setOpen( !open ) } />
                </MediaQuery>
            </nav>
            <MediaQuery maxDeviceWidth={ Breakpoints.mobile.max }>
                <div className={ dropdownClasses.join( ' ' ) }>
                    <MenuOptions callback={ close } />
                </div>
            </MediaQuery>
        </>
    );
}

export default Menu;