import { GRID_RESET, MENU_OPEN, SET_DIFFICULTY, TOGGLE_NOTE_MODE } from '../constants/actions/app';

/**
 * @name handleDialog
 * @constant
 * @function
 * @description Determines the open/closed state of the dialog
 * @param {string} [id] If provided, opens the dialog with to corresponding id. If not provided, closes all dialogs
 */
export const handleDialog = ( id=null ) => {
    return dispatch => dispatch({ type: MENU_OPEN, payload: { id } });
}

/**
 * @name reset
 * @constant
 * @function
 * @description Creates a new puzzle
 */
export const reset = () => {
    return dispatch => dispatch({ type: GRID_RESET });
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
        dispatch({ type: SET_DIFFICULTY, payload: { difficulty } });
        dispatch({ type: GRID_RESET });
    }
}

/**
 * @name toggleNoteMode
 * @constant
 * @function
 * @description Toggles the game between entry mode and note mode
 */
export const toggleNoteMode = difficulty => {
    return dispatch => dispatch({ type: TOGGLE_NOTE_MODE });
}