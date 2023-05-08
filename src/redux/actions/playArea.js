const BASE = 'GRID_',
CELL = BASE + 'CELL_';

/**
 * Used to set an active cell
 * @type {string}
 */
export const ACTIVE_CELL = CELL + 'ACTIVATE';

/**
 * Used to set an active cell
 * @type {string}
 */
export const CLEAR_CELL = CELL + 'CLEAR';

/**
 * Used to fill a cell with a value
 * @type {string}
 */
export const FILL_CELL = CELL + 'FILL';

/**
 * Used to log when the user enters an erroneous input
 * @type {string}
 */
export const LOG_ERROR = CELL + 'LOG_ERROR';

/**
 * Used to move the active cell
 * @type {string}
 */
export const MOVE_ACTIVE_CELL = CELL + 'MOVE_ACTIVE';

/**
 * Used to pause/unpause the game
 * @type {string}
 */
export const PAUSE = BASE + 'PAUSE';

/**
 * Used to toggle notes mode on or off
 * @type {string}
 */
export const TOGGLE_NOTES = BASE + 'TOGGLE_NOTES';

/**
 * Undoes a change
 * @type {string}
 */
export const UNDO_MOVE = BASE + 'UNDO';