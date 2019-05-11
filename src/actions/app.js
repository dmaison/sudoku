import { GRID_RESET, MENU_OPEN, SET_DIFFICULTY } from '../constants/actions/app';

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
 * @description Creates a new puzzle
 * @param {string} difficulty Difficulty to set the game to
 */
export const setDifficulty = difficulty => {
    return dispatch => {
        dispatch({ type: SET_DIFFICULTY, payload: { difficulty } });
        dispatch({ type: GRID_RESET });
    }
}