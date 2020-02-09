import * as CONSTANTS from '../constants/actions/app'

/**
 * @name handleDialog
 * @constant
 * @function
 * @description Determines the open/closed state of the dialog
 * @param {string} [id] If provided, opens the dialog with to corresponding id. If not provided, closes all dialogs
 */
export const handleDialog = ( id=null ) => {
    return dispatch => dispatch({ type: CONSTANTS.MENU_OPEN, payload: { id } });
}

/**
 * @name handleInput
 * @constant
 * @function
 * @description Sets the value of a cell
 * @param {number} column Column row
 * @param {number} row 
 * @param {number} section 
 * @param {number} value 
 */
export const handleInput = ( column, row, section, value ) => {
    return dispatch => {
        if( isNaN( value ) ) value = undefined;
        dispatch({ type: CONSTANTS.SET_INPUT, payload: { column, row, section, value } });
    }
}

/**
 * @name highlight
 * @constant
 * @function
 * @description Highlights the active 
 * @param {number} [column=null] Column number to highlight
 * @param {number} [row=null] Row number to highlight
 * @param {number} [section=null] Section to highlight
 */
export const highlight = ( column=null, row=null, section=null ) => {
    return dispatch => dispatch({ type: CONSTANTS.GRID_HIGHLIGHT, payload: { column, row, section } });
}

/**
 * @name load
 * @constant
 * @function
 * @description Used to load a saved game
 */
export const load = index => {
    return dispatch => dispatch({ type: CONSTANTS.GAME_LOAD, payload: { index } });
}

/**
 * @name reset
 * @constant
 * @function
 * @description Creates a new puzzle
 */
export const reset = () => {
    return dispatch => dispatch({ type: CONSTANTS.GRID_RESET });
}

/**
 * @name save
 * @constant
 * @function
 * @description Used to save a game
 */
export const save = () => {
    return dispatch => dispatch({ type: CONSTANTS.GAME_SAVE });
}

/**
 * @name setDifficulty
 * @constant
 * @function
 * @description Sets the difficulty and creates a new puzzle
 * @param {string} difficulty Difficulty to set the game to
 */
export const setDifficulty = difficulty => {
    return dispatch => {
        dispatch({ type: CONSTANTS.SET_DIFFICULTY, payload: { difficulty } });
        dispatch({ type: CONSTANTS.GRID_RESET });
    }
}

/**
 * @name toggleNoteMode
 * @constant
 * @function
 * @description Toggles the game between entry mode and note mode
 */
export const toggleNoteMode = () => {
    return dispatch => dispatch({ type: CONSTANTS.TOGGLE_NOTE_MODE });
}