import * as ACTIONS from '../actions/playArea';
import { createGrid, toggleNotes } from '../../utils/playArea';

export const DEFAULT_LIMIT = 9;

export const DEFAULT_SIZE = 3;

const INITIAL_STATE = {
    activeCell: null,
    limit: DEFAULT_LIMIT, // max number that can be represented in the grid
    size: DEFAULT_SIZE, // section grid dimension size (e.g. 3x3)
    grid: createGrid(),
    takingNotes: false
};

const reducer = ( state=INITIAL_STATE, action ) => {

    let grid = [ ...state.grid ],
    index = state.activeCell?.index;

    switch( action.type ){

        case ACTIONS.ACTIVE_CELL:
            return { ...state, activeCell: { ...action.payload } };

        case ACTIONS.CLEAR_CELL:
            if( index ) delete grid[ index ].input;
            return { ...state, grid };

        case ACTIONS.FILL_CELL:
            const input = parseInt( action.payload );
            if( index ){

                let activeCell = grid[ index ];

                // if taking notes, set as a note
                if( state.takingNotes && !activeCell.visible ){

                    activeCell = toggleNotes( activeCell, input );

                // if not taking notes, set as input
                } else {
                    activeCell.input = input;
                    activeCell.notes = [];

                    // clear sibling notes of the input value
                    for( let cell of grid ){
                        if( cell.column !== activeCell.column && cell.row !== activeCell.row && cell.section === activeCell.section ) continue;
                        cell = toggleNotes( cell, input, true );
                    }

                }
            }
            return { ...state, grid };

        case ACTIONS.TOGGLE_NOTES:
            return { ...state, takingNotes: !state.takingNotes };

        default:
            return { ...state };

    }

};

export default reducer;