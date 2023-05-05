import * as ACTIONS from '../actions/playArea';

const INITIAL_STATE = {
    grid: createGrid()
};

const reducer = ( state=INITIAL_STATE, action ) => {

    switch( action.type ){

        default:
            return { ...state };

    }

};

/**
 * Creates a puzzle grid
 * @param {number} [limit=9] The highest number allowed in the grid 
 * @param {number} [size=3] Both X and Y dimensions of the grouping (e.g. 3x3)
 * @returns {array} The grid
 */
function createGrid( limit=9, size=3 ){

    const grid = [];

    for( let i = 1; i < ( Math.pow( limit, 2 ) + 1 ); ++i ){

        const column = i % limit || limit,
        row = Math.ceil( i / limit ),
        bigColumn = Math.ceil( i / size ) % size || size,
        bigRow = Math.ceil( i / ( limit * size ) ) - 1,
        section = bigColumn + ( size * bigRow );

        grid.push({ 
            column, 
            row,
            section,
        });

    }

    return populateGrid( grid, limit );

}

/**
 * Determines what a valid option for the cell should be, if any
 * @param {number} length How long the options list should be
 * @param {array} exclusions Array of numbers we don't want
 * @returns {number|undefined} The valid option
 */
function findValidOption( length, exclusions=[] ){
    
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
function populateGrid( grid, limit ){

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
function shuffle( shuffledArray ){
    
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

export default reducer;