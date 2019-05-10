/**
 * @name shuffle
 * @constant
 * @function
 * @description Shuffles the order of items in an array
 * @param {array} array 
 * @returns {array} The shuffled array
 */
export const shuffle = array => {
    let currentIndex = array.length,
    shuffledArray = [ ...array ],
    temporaryValue, 
    randomIndex;
    
    while( 0 !== currentIndex ){        
        randomIndex = Math.floor( Math.random() * currentIndex );
        currentIndex -= 1;
    
        temporaryValue = shuffledArray[ currentIndex ];
        shuffledArray[ currentIndex ] = shuffledArray[ randomIndex ];
        shuffledArray[ randomIndex ] = temporaryValue;
    }

    return shuffledArray;
}