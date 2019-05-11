import { GRID_RESET, MENU_OPEN } from '../constants/actions/app';

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