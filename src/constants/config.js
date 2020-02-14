/**
 * @name BUG_URL
 * @constant
 * @string
 * @description URL for reporting bugs
 */
export const BUG_URL = 'https://github.com/dmaison/sudoku/issues/new'

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
    LOAD: 'l',
    NOTES: 'n',
    NUMERIC: 'numeric',
    RIGHT: 'right',
    SAVE: 's',
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
 * @name STORAGE_SAVE
 * @constant
 * @description Name of localstorage object
 */
export const STORAGE_SAVE = 'sudoku-saves';

/**
 * @name STORAGE_BEST
 * @constant
 * @description Name of localstorage object
 */
export const STORAGE_BEST = 'sudoku-bests';