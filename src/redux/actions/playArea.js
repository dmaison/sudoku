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
 * Used to toggle notes mode on or off
 * @type {string}
 */
export const TOGGLE_NOTES = BASE + 'TOGGLE_NOTES';

/**
 * Undoes a change
 * @type {string}
 */
export const UNDO_MOVE = BASE + 'UNDO';