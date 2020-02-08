import { GRID_OPTIONS } from '../constants/grid';
import { DIFFICULTIES, LEVEL_EASY } from '../constants/difficulties';
import { shuffle } from './array';
import { create as createCell, isValid } from './cell';

/**
 * @name check
 * @function
 * @description checks to see if a puzzle is complete
 * @param {*} grid 
 * @returns {booelan} `true` if puzzle is completed. `false` if puzzle is incomplete
 */
export const check = grid => grid.every( cell => {
    if( cell.disabled ) return true;
    return cell.input && cell.input === cell.value 
});
    

/**
 * @name commit
 * @function
 * @description Finalizes a puzzle. 
 * @param {*} difficulty 
 * @param {*} grid 
 */
export const commit = ( difficulty=LEVEL_EASY, grid ) => {
    
    let tempGrid = [ ...grid ],
    pattern = shuffle( [ ...DIFFICULTIES.find( option => difficulty === option.level ).pattern ]),
    sections = GRID_OPTIONS.map( ( s, index ) => tempGrid.filter( cell => cell.section === index ) );

    sections.forEach( section => {

        let tilesToCommit = pattern.pop();

        while( tilesToCommit !== 0 ){
            let index = Math.floor( Math.random() * section.length );
            if( section[ index ].disabled ) continue;
            section[ index ].disabled = true;
            --tilesToCommit;
        }

    });

    return tempGrid;
        
}

/**
 * @name create
 * @constant
 * @function
 * @description Creates an array that is used to create the play area grid
 * @returns {array}
 */
export const create = () => {

    var column = 1,
    row = 1,
    grid = GRID_OPTIONS.map(
        ( value, index1 ) => {
            if( index1 !== 0 ) column += 3;

            if( index1 % 3 === 0 && index1 !== 0 ){
                row += 3;
                column = 1;
            }
        
            var innerRow = row,
            innerColumn = column;
        
            return GRID_OPTIONS.map( ( value, index2 ) => {
                if( index2 !== 0 ) innerColumn += 1;
                if( index2 % 3 === 0 && index2 !== 0 ){
                    innerRow += 1;
                    innerColumn = column;
                }
                return createCell( innerColumn, innerRow, index1 )
            });
        }
    );
   
    return grid.reduce( ( a, b ) => [ ...a, ...b ], []);
        
}

/**
 * @name fill
 * @constant
 * @function 
 * @description Applies values to the grid produced by `create`
 * @param {array} grid 
 */
export const fill = grid => {

    if( grid.every( input => input.value ) ) return true;

    let options = shuffle( GRID_OPTIONS ),
    cell = grid.find( cell => !cell.value ), 
    viableOptions = options.filter( value => isValid( grid, cell, value ) );
    viableOptions.forEach( value => {
        if( cell.value ) return;
        cell.value = value;
        if( !fill( grid ) ) cell.value = undefined;
    });
    return ( cell.value !== undefined );
}