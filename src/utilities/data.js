import { STORAGE_SAVE, STORAGE_BEST } from '../constants/config'

/**
 * @name gameTime
 * @function
 * @description Retrieve current game time
 */
export const gameTime = () => document.getElementById( 'time' ).dataset.value;

/**
 * @name get
 * @function
 * @description Retrieves all saved game data
 */
export const get = () => {
    let data = localStorage.getItem( STORAGE_SAVE );
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
export const save = ( grid, difficulty, mistakes, time ) => {

    let saves = get();

    if( saves.length >= 3 ) saves.shift();

    saves.push({
        id: new Date(),
        difficulty,
        grid,
        mistakes,
        time
    });

    localStorage.setItem( STORAGE_SAVE, JSON.stringify( saves ) );

    return saves;

}

/**
 * @name personalBestGet
 * @function
 * @description Retrieves personal best data
 * @param {string} [difficulty] If provided, returns data from the specified difficulty
 */
export const personalBestGet = difficulty => {

    let data = localStorage.getItem( STORAGE_BEST );
    if( !data ) return {};
    data = JSON.parse( data );

    return ( difficulty ) ? data[ difficulty ] : data;

}

/**
 * @name personalBestSave
 * @function
 * @description 
 * @param {string} difficulty 
 * @returns {object} Object containing the record of bests
 */
export const personalBestSave = ( difficulty, mistakes, time ) => {

    let bests = personalBestGet(),
    best = bests[ difficulty ];

    if( !best ){
        best = { mistakes, time };

    } else {

        let oldTime = Number( best.time.replace( ':', '' ) ),
        newTime = Number( time.replace( ':', '' ) );

        if( newTime < oldTime ) best = { mistakes, time };

    }

    bests[ difficulty ] = best;

    localStorage.setItem( STORAGE_BEST, JSON.stringify( bests ) );

    return bests;

}