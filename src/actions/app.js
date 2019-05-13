import * as CONSTANTS from '../constants/actions/app';

/**
 * @name clearNote
 * @constant
 * @function
 * @description Clears notes from sibling cells when a value has been committed
 * @param {number} [column=null] Column to remove the value from
 * @param {number} [row=null] Row to remove the value from
 * @param {number} [section=null] Section to remove the value from
 * @param {number} [value=null] Value to remove from the notes
 */
export const clearNote = ( column=null, row=null, section=null, value=null ) => {
    return dispatch => dispatch({ type: CONSTANTS.GRID_CLEAR_NOTE, payload: { column, row, section, value } });
}

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
 * @name reset
 * @constant
 * @function
 * @description Creates a new puzzle
 */
export const reset = () => {
    return dispatch => dispatch({ type: CONSTANTS.GRID_RESET });
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
export const toggleNoteMode = difficulty => {
    return dispatch => dispatch({ type: CONSTANTS.TOGGLE_NOTE_MODE });
}

/**
 * @name trackMistake
 * @constant
 * @function
 * @description Tracks a mistake
 */
export const trackMistake = () => {
    return dispatch => dispatch({ type: CONSTANTS.TRACK_MISTAKE });
}