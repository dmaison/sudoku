import { GRID_RESET } from '../constants/app';

/**
 * @name reset
 * @constant
 * @function
 * @description Creates a new puzzle
 */
export const reset = () => {
    return dispatch => dispatch({ type: GRID_RESET });
}