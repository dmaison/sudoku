/**
 * @name LEVEL_EASY
 * @constant
 * @string
 * @description
 */
export const LEVEL_EASY = 'easy';

/**
 * @name LEVEL_HARD
 * @constant
 * @string
 * @description
 */
export const LEVEL_HARD = 'hard';

/**
 * @name LEVEL_MEDIUM
 * @constant
 * @string
 * @description
 */
export const LEVEL_MEDIUM = 'medium';

/**
 * @name PATTERN_EASY
 * @constant
 * @array
 * @description
 */
// export const PATTERN_EASY = [ 4, 3, 4, 3, 4, 3, 4, 3, 4 ];
export const PATTERN_EASY = [ 9, 9, 9, 9, 9, 9, 9, 9, 8 ];

/**
 * @name PATTERN_HARD
 * @constant
 * @array
 * @description
 */
export const PATTERN_HARD = [ 3, 3, 2, 3, 2, 1, 3, 2, 3 ];

/**
 * @name PATTERN_MEDIUM
 * @constant
 * @array
 * @description
 */
export const PATTERN_MEDIUM = [ 3, 3, 3, 3, 3, 3, 3, 3, 3 ];

/**
 * @name DIFFICULTIES
 * @constant
 * @array
 * @description
 */
export const DIFFICULTIES = [
    {
        level: LEVEL_HARD,
        pattern: PATTERN_HARD
    },
    {
        level: LEVEL_MEDIUM,
        pattern: PATTERN_MEDIUM
    },
    {
        level: LEVEL_EASY,
        pattern: PATTERN_EASY
    }
];