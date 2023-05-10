import * as ACTIONS from '../actions/playArea';
import { createGrid, createHistory, toggleNotes, DEFAULT_LIMIT, DEFAULT_SIZE, DEFAULT_DIFFICULTY, spreadGrid, DIFFICULTIES, LOCALSTORAGE_NAME } from '../../utils/playArea';

const INITIAL_GRID = createGrid(),
INITIAL_STATE = {
    activeCell: null,
    difficulty: DEFAULT_DIFFICULTY,
    endGame: null,
    errors: 0,
    game: new Date(),
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
            let endGame = state.endGame;
            if( index !== undefined ){

                let activeCell = grid[ index ];

                // if taking notes, set as a note
                if( state.takingNotes && !activeCell.visible ){

                    activeCell = toggleNotes( activeCell, input );

                // if not taking notes, set as input
                } else if( activeCell?.input !== activeCell.answer ){

                    let allPopulated = true;

                    activeCell.input = input;
                    activeCell.notes = [];

                    // clear sibling notes of the input value
                    for( let cell of grid ){
                        
                        // while we're doing this, check to see if the grid is completed
                        if( allPopulated && !cell.visible ) allPopulated = ( cell.answer === cell.input );

                        if( cell.column !== activeCell.column && cell.row !== activeCell.row && cell.section === activeCell.section ) continue;
                        cell = toggleNotes( cell, input, true );
                    }

                    // if the grid is compeleted, set the endGame time
                    if( activeCell.input === activeCell.answer && allPopulated ) endGame = new Date();

                }
            }
            return createHistory({ ...state, endGame }, grid );

        case ACTIONS.LOAD:
            const loadedState = localStorage.getItem( LOCALSTORAGE_NAME );
            if( loadedState ) return { ...JSON.parse( loadedState ) };
            return { ...state };

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
            const difficulty = DIFFICULTIES.find( ({ label }) => label === action.payload );
            return { ...INITIAL_STATE, game: ( state.game + 1 ), grid: createGrid( undefined, undefined, difficulty ), difficulty, game: new Date() };

        case ACTIONS.PAUSE:
            return { ...state, paused: action.payload };

        case ACTIONS.RESTART:
            return { ...INITIAL_STATE, grid: spreadGrid( state.gridHistory[ 0 ] || state.grid ), game: new Date() };

        case ACTIONS.SAVE:
            localStorage.setItem( LOCALSTORAGE_NAME, JSON.stringify({ ...state, save: new Date(), paused: false }) );
            return { ...state };

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