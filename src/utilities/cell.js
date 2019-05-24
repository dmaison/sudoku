/**
 * @name isValid
 * @constant
 * @function
 * @description Determines if the current cell value is valid
 * @returns {boolean} `true` if valid, `false` if invalid
 * @param {array} cells
 * @param {number} cells[].column
 * @param {number} cells[].row
 * @param {number} cells[].section
 * @param {number} column
 * @param {number} index
 * @param {number} row
 * @param {number} section
 * @param {number} value 
 */
export const isValid = ( cells, cell, value ) => {
    
    let siblings = cells.filter( sibling => {
        if( sibling === cell ) return false;
        if( 
            sibling.column !== cell.column && 
            sibling.row !== cell.row && 
            sibling.section !== cell.section
        ) return false;
        return ( sibling.value === value );
    });

    return ( siblings.length === 0 );
}

/**
 * @name create
 * @constant
 * @function
 * @description Creates a cell object for building a puzzle
 * @returns {Object} Cell object
 * @param {number} column 
 * @param {number} row 
 * @param {number} section 
 * @param {number} value
 */
export const create = ( column, row, section, value ) => ({
    column,
    notes: [],
    row,
    section,
    value
});