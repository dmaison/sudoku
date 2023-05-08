import * as ACTIONS from '../actions/playArea';
import { createGrid, createHistory, toggleNotes, DEFAULT_LIMIT, DEFAULT_SIZE, DEFAULT_DIFFICULTY, spreadGrid } from '../../utils/playArea';

const INITIAL_GRID = createGrid(),
INITIAL_STATE = {
    activeCell: null,
    difficulty: DEFAULT_DIFFICULTY,
    errors: 0,
    game: 1,
    gridHistory: [],
    limit: DEFAULT_LIMIT, // max number that can be represented in the grid
    size: DEFAULT_SIZE, // section grid dimension size (e.g. 3x3)
    grid: INITIAL_GRID,
    paused: false,
    takingNotes: false
};

const reducer = ( state=INITIAL_STATE, action ) => {

    let grid = spreadGrid( state.grid ),
    index = state.activeCell?.index;

    switch( action.type ){

        case ACTIONS.ACTIVE_CELL:
            return { ...state, activeCell: { ...action.payload } };

        case ACTIONS.CLEAR_CELL:
            if( index !== undefined && grid[ index ]?.input !== grid[ index ].answer ) delete grid[ index ].input;
            return createHistory({ ...state }, grid );

        case ACTIONS.FILL_CELL:
            const input = parseInt( action.payload );
            if( index !== undefined ){

                let activeCell = grid[ index ];

                // if taking notes, set as a note
                if( state.takingNotes && !activeCell.visible ){

                    activeCell = toggleNotes( activeCell, input );

                // if not taking notes, set as input
                } else if( activeCell?.input !== activeCell.answer ){

                    activeCell.input = input;
                    activeCell.notes = [];

                    // clear sibling notes of the input value
                    for( let cell of grid ){
                        if( cell.column !== activeCell.column && cell.row !== activeCell.row && cell.section === activeCell.section ) continue;
                        cell = toggleNotes( cell, input, true );
                    }

                }
            }
            return createHistory({ ...state }, grid );

        case ACTIONS.LOG_ERROR:
            let errors = ( state.errors + 1 );
            return { ...state, errors };

        case ACTIONS.MOVE_ACTIVE_CELL:

            const { column, row } = action.payload,
            previousActive = ( index !== undefined ) ? { ...grid[ index ] } : null,
            nextColumn = ( previousActive?.column + column ),
            nextRow = ( previousActive?.row + row );
            
            // default active cell to the previous active or first grid
            let activeCell = { ...( previousActive || grid[ 0 ] ) };

            if( !!previousActive && ( nextColumn >= 1 && nextColumn <= 9 && nextRow >= 1 && nextRow <= 9 ) ){
                activeCell = { ...grid.find( ({ column, row }) => ( column === nextColumn && row === nextRow ) ) };
            }

            return { ...state, activeCell };

        case ACTIONS.NEW_GAME:
            return { ...INITIAL_STATE, game: ( state.game + 1 ), grid: createGrid() };

        case ACTIONS.PAUSE:
            return { ...state, paused: action.payload };

        case ACTIONS.TOGGLE_NOTES:
            return { ...state, takingNotes: !state.takingNotes };

        case ACTIONS.UNDO_MOVE:
            const gridHistory = [ ...state.gridHistory ];
            if( gridHistory.length > 0 ) grid = gridHistory.pop();
            return { ...state, grid, gridHistory };

        default:
            return { ...state };

    }

};

export default reducer;