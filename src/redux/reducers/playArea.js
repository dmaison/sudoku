import * as ACTIONS from '../actions/playArea';
import { createGrid, createHistory, toggleNotes, DEFAULT_LIMIT, DEFAULT_SIZE, DEFAULT_DIFFICULTY, spreadGrid, DIFFICULTIES, LOCALSTORAGE_NAME, completionTracker, trimCompletion } from '../../utils/playArea';

const INITIAL_GRID = createGrid(),
INITIAL_STATE = {
    activeCell: null,
    difficulty: DEFAULT_DIFFICULTY,
    endGame: null,
    errors: 0,
    game: new Date(),
    gridHistory: [],
    highlights: {},
    limit: DEFAULT_LIMIT, // max number that can be represented in the grid
    size: DEFAULT_SIZE, // section grid dimension size (e.g. 3x3)
    grid: INITIAL_GRID,
    paused: false,
    takingNotes: false
};

const reducer = ( state=INITIAL_STATE, action ) => {

    const gridHistory = [ ...state.gridHistory ];

    let grid = spreadGrid( state.grid ),
    index = state.activeCell?.index;

    switch( action.type ){

        case ACTIONS.ACTIVE_CELL:
            return { ...state, activeCell: { ...action.payload } };

        case ACTIONS.CLEAR_CELL:
            if( index !== undefined && grid[ index ]?.input !== grid[ index ].answer ) delete grid[ index ].input;
            return createHistory({ ...state }, grid );

        case ACTIONS.FILL_CELL:
            const input = parseInt( action.payload ),
            nextHistory = [],
            completion = completionTracker();

            let endGame = state.endGame,
            highlights = { ...state.highlights };
            
            if( index !== undefined ){

                let activeCell = grid[ index ];

                // if taking notes, set as a note
                if( state.takingNotes && !activeCell.visible ){

                    activeCell = toggleNotes( activeCell, input );

                // if not taking notes, set as input
                } else if( activeCell?.input !== activeCell.answer ){

                    let allPopulated = true;

                    for( let cell of grid ){

                        const cellPopulated = ( cell !== activeCell ) ? ( cell.answer === cell.input ) : ( cell.answer === input );

                        if( cellPopulated || cell.visible ){
                            completion[ `column${ cell.column }` ] += 1;
                            completion[ `row${ cell.row }` ] += 1;
                            completion[ `section${ cell.section }` ] += 1;
                        }

                        // maintain history up to date
                        nextHistory.push({ ...cell });
                        
                        // while we're doing this, check to see if the grid is completed
                        if( allPopulated && !cell.visible ){
                            allPopulated = cellPopulated;
                        }

                        // skip this cell if its not in the same column, row, or section as the active cell
                        if( cell.column !== activeCell.column && cell.row !== activeCell.row && cell.section === activeCell.section ) continue;

                        // clear the input from the notes of sibling cells
                        cell = toggleNotes( cell, input, true );
                    }

                    highlights = trimCompletion( state.highlights, completion );

                    // update input value
                    activeCell.input = input;
                    activeCell.notes = [];

                    // if the grid is compeleted, set the endGame time
                    if( activeCell.input === activeCell.answer && allPopulated ) endGame = new Date();

                    // add history
                    gridHistory.push( nextHistory );

                }
            }
            return { ...state, grid, gridHistory, endGame, highlights };

        case ACTIONS.LOAD:
            const loadedState = localStorage.getItem( LOCALSTORAGE_NAME ),
            nextState = ( loadedState ) ? JSON.parse( loadedState ) : state;
            return { ...nextState, save: new Date( nextState.save ), game: new Date( nextState.game ) };

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
            localStorage.setItem( LOCALSTORAGE_NAME, JSON.stringify({ ...state, save: action.payload, paused: false }) );
            return { ...state };

        case ACTIONS.TOGGLE_NOTES:
            return { ...state, takingNotes: !state.takingNotes };

        case ACTIONS.UNDO_MOVE:
            if( gridHistory.length > 0 ) grid = gridHistory.pop();
            return { ...state, grid, gridHistory };

        default:
            return { ...state };

    }

};

export default reducer;