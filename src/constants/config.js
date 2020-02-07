/**
 * @name INPUTS
 * @constant
 * @description array of possible inputs for the cells
 */
export const INPUTS = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

/**
 * @name KEYS
 * @constant
 * @description Contains the key codes for the keydown events
 */
export const KEYS = {
    BACKSPACE: 'backspace',
    DOWN: 'down',
    LEFT: 'left',
    NOTES: 'n',
    NUMERIC: 'numeric',
    RIGHT: 'right',
    UP: 'up'
};

/**
 * @name MAX_SAVES
 * @constant
 * @number
 * @description Determines the maximum number of saves allowed
 */
export const MAX_SAVES = 3;

/**
 * @name STORAGE_NAME
 * @constant
 * @description Name of localstorage object
 */
export const STORAGE_NAME = 'sudoku-saves';