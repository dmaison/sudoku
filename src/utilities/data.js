import { STORAGE_NAME } from '../constants/config'

/**
 * @name get
 * @function
 * @description Retrieves all saved game data
 */
export const get = () => {
    let data = localStorage.getItem( STORAGE_NAME );
    if( !data ) return [];
    return JSON.parse( data );
}

/**
 * @name save
 * @function
 * @description Saves a game
 * @param {array} grid 
 * @param {number} mistakes 
 * @param {number} time 
 */
export const save = ( grid, mistakes, time ) => {

    let saves = get();

    if( saves.length >= 3 ) saves.shift();

    saves.push({
        id: new Date(),
        grid,
        mistakes,
        time
    });

    localStorage.setItem( STORAGE_NAME, JSON.stringify( saves ) );

    return saves;

}