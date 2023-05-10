import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux"
import { usePrevious } from "../../utils/hooks";

const Highlighter = () => {

    const nextHighlight = useSelector( state => state.playArea.highlights ),
    previousHighlight = usePrevious({ ...nextHighlight });

    /**
     * Adds an animation class to the completed cells
     */
    const addHighlight = useCallback( items => {
        const selector = items.map( item => `[data-group*="${ item }"]` ).join( ',' ),
        elems = document.querySelectorAll( selector ),
        grid = document.querySelector( '.board' ),
        exclusion = 'cell--shimmer',
        animate = 'board--animate';

        grid.classList.add( animate );
        for( const elem of elems ){
            elem.classList.add( exclusion );
            setTimeout( elem => elem.classList.remove( exclusion ), 1001, elem );
        }

        setTimeout( grid => grid.classList.remove( animate ), 1002, grid );
        
    }, []);

    /**
     * find the changes in the highlight list
     */
    const findHighlights = useCallback(() => {

        const highlights = [];

        for( const key in nextHighlight ){
            if( previousHighlight !== null ){
                if( nextHighlight[ key ] !== previousHighlight[ key ] ) highlights.push( key );
            } else {
                highlights.push( key );
            }
        }

        if( highlights.length > 0 ) addHighlight( highlights );

    }, [ nextHighlight, previousHighlight, addHighlight ]);

    // evaluate changes in complete cells
    useEffect(() => {
        findHighlights();
    }, [ nextHighlight, findHighlights ]);

    return null;

}

export default Highlighter