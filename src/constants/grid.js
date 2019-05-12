/**
 * @name GRID_MAXIMUM
 * @constant
 * @array
 * @description Contains the valid options for input
 */
export const GRID_MAXIMUM = 9;

/**
 * @name GRID_MINIMUM
 * @constant
 * @array
 * @description Contains the valid options for input
 */
export const GRID_MINIMUM = 1;

// This seems asinine, but it enforces the value integrity and makes it easier configure a more complex grid
let options = [];
for( let i = GRID_MINIMUM; i < ( GRID_MAXIMUM + 1 ); ++i ) options.push( i );

/**
 * @name GRID_OPTIONS
 * @constant
 * @array
 * @description Contains the valid options for input
 */
export const GRID_OPTIONS = [ ...options ];