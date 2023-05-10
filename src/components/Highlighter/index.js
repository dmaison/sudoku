import { useEffect } from "react";
import { useSelector } from "react-redux"

const Highlighter = () => {

    const nextHighlight = useSelector( state => state.playArea.highlights );

    useEffect(() => {

        const highlights = [];

        for( const key in nextHighlight ){
            if( nextHighlight[ key ] ) highlights.push( key );
        }

        console.log( 'Highlighter', 'useEffect', highlights );

    }, [ nextHighlight ]);

    return (
        <>
            highlighter
        </>
    )

}

export default Highlighter