/**
 * Determines the number of "undos" a player can use
 * @constant
 * @type {number}
 */
export const DEFAULT_HISTORY_LIMIT = 3;

/**
 * Determines the default grid width as 9x9
 * @constant
 * @type {number}
 */
export const DEFAULT_LIMIT = 9;

/**
 * Determines the default grid section size as 3x3
 * @constant
 * @type {number}
 */
export const DEFAULT_SIZE = 3;

/**
 * List of available difficulties
 */
export const DIFFICULTIES = [
    { 
        label: 'Easy',
        probability: 0.75
    },
    { 
        label: 'Intermediate',
        probability: 0.6
    },
    { 
        label: 'Hard',
        probability: 0.5
    },
    { 
        label: 'Expert',
        probability: 0.2
    },
];

/**
 * Used for testing, extremely easy
 */
const TEST_DIFFICULTY = { 
    label: 'Test',
    probability: 0.95
}

// if its local development, add the test difficulty in
if( process.env !== 'production' ) DIFFICULTIES.unshift( TEST_DIFFICULTY );

/**
 * Default difficulty for starting the application
 * @type {object}
 */
export const DEFAULT_DIFFICULTY = DIFFICULTIES[ 0 ];

/**
 * Used to save/load games from localstorage
 * @type {string}
 */
export const LOCALSTORAGE_NAME = 'save';

/**
 * Creates a completion tracker object
 * @param {number} limit 
 * @returns {object} 
 */
export const completionTracker = ( limit=DEFAULT_LIMIT ) => {
    const obj = {}
    for( let i = 1; i < ( limit + 1 ); ++i ){
        obj[ `column${ i }` ] = 0;
        obj[ `row${ i }` ] = 0;
        obj[ `section${ i }` ] = 0;
    }
    return obj;
}

/**
 * Creates a puzzle grid
 * @param {number} [limit=9] The highest number allowed in the grid 
 * @param {number} [size=3] Both X and Y dimensions of the grouping (e.g. 3x3)
 * @returns {array} The grid
 */
export const createGrid = ( limit=DEFAULT_LIMIT, size=DEFAULT_SIZE, difficulty=DEFAULT_DIFFICULTY ) => {

    const grid = [];

    for( let i = 1; i < ( Math.pow( limit, 2 ) + 1 ); ++i ){

        const column = i % limit || limit,
        row = Math.ceil( i / limit ),
        bigColumn = Math.ceil( i / size ) % size || size,
        bigRow = Math.ceil( i / ( limit * size ) ) - 1,
        section = bigColumn + ( size * bigRow ),
        rand = Math.random(),
        visible = ( rand < difficulty.probability );

        grid.push({ 
            column, 
            error: false,
            index: ( i - 1 ),
            notes: [],
            row,
            section,
            visible
        });

    }

    try {
        return populateGrid( grid, limit );
    } catch( err ){
        return grid;
    }

}

/**
 * Automatically generates the history of the grid
 * @param {object} state
 * @returns {object} The state object w/ updated history
 */
export const createHistory = ( state, grid ) => {

    const gridHistory = [ ...state.gridHistory ];
    gridHistory.push( spreadGrid( state.grid ) );

    if( gridHistory.length > DEFAULT_HISTORY_LIMIT ) gridHistory.shift();

    return { ...state, grid, gridHistory };

}

/**
 * Determines what a valid option for the cell should be, if any
 * @param {number} length How long the options list should be
 * @param {array} exclusions Array of numbers we don't want
 * @returns {number|undefined} The valid option
 */
export const findValidOption = ( length, exclusions=[] ) => {
    
    const options = shuffle( Array.from({ length }, ( _, index ) => index + 1 ) );

    let validOption = undefined;

    for( const option of options ){
        if( exclusions.includes( option ) || !!validOption ) continue;
        validOption = option;
    }

    return validOption;

}

/**
 * Fills a grid with the puzzle answers
 * @param {array} grid 
 * @param {number} limit The highest number allowed in the grid 
 * @returns {array}
 */
export const populateGrid = ( grid, limit ) => {

    // go through each cell
    for( const cell of grid ){

        const exclusions = [];

        // get all of the values for the cell's siblings 
        for( const sibling of grid ){
            if( sibling === cell || ( sibling.row !== cell.row && sibling.column !== cell.column && sibling.section !== cell.section ) ) continue;
            if( sibling.answer && !exclusions.includes( sibling.answer ) ) exclusions.push( sibling.answer );
        }

        cell.answer = findValidOption( limit, exclusions );
        if( !cell.answer ) return populateGrid( grid, limit );

    }

    return grid;

}

/**
 * Shuffles the contents of a provided array
 * @param {array} shuffledArray 
 * @returns {array}
 */
export const shuffle = shuffledArray => {
    
    let index = shuffledArray.length,
    temporaryValue, 
    randomIndex;
    
    while( 0 !== index ){        
        randomIndex = Math.floor( Math.random() * index );
        index -= 1;
    
        temporaryValue = shuffledArray[ index ];
        shuffledArray[ index ] = shuffledArray[ randomIndex ];
        shuffledArray[ randomIndex ] = temporaryValue;
    }

    return shuffledArray;
}

/**
 * Maps the grid to a unique object to eliminate inheritence
 * @param {array} grid 
 * @returns {array} Independent instance of the provided `grid` array
 */
export const spreadGrid = grid => {
    return [ ...grid ].map( cell => ({ ...cell }))
}

/**
 * Sets or unsets a noted input
 * @param {object} cell Cell to have the notes updated in
 * @param {number} input Number to add/remove the note of
 * @param {boolean} [forceRemove=false] Determine if `input` can _only_ be removed. Set to `true` to force removal.
 * @returns {object} the updated cell
 */
export const toggleNotes = ( cell, input, forceRemove=false ) => {
    let notes = cell.notes,
    noteIndex = notes.indexOf( input );

    // if not already noted, add
    if( noteIndex === -1 && !forceRemove ){
        notes.push( input );

    // if already noted remove
    } else if( noteIndex > -1 ) {
        notes.splice( noteIndex, 1 );
    }

    return cell;
}

/**
 * Creates a viable next highlight
 * @param {array} highlights 
 * @param {object} nextHighlight 
 * @returns {object}
 */
export const trimCompletion = ( highlights={}, nextHighlight={}, limit=DEFAULT_LIMIT ) => {

    for( const key in nextHighlight ){
        highlights[ key ] = ( nextHighlight[ key ] === limit );
    }

    return { ...highlights };

}