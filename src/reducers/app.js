import { commit, create, fill } from '../utilities/grid';
import * as CONSTANTS from '../constants/actions/app';

const INITIAL_STATE = {
	active: {
		column: null,
		row: null,
		section: null
    },
    clear: {
		column: null,
		row: null,
        section: null,
        value: null
    },
    errors: 0,
    game: 1,
	grid: create(),	
	noteMode: false,
    openDialog: null,
    timerOn: true
};

const app = ( state = INITIAL_STATE, action ) => {

    var grid;

	switch( action.type ){

		case CONSTANTS.GRID_RESET:
			grid = create();
			fill( grid );
			grid = commit( state.difficulty, grid );
			return { ...state, game: ( state.game + 1 ), grid, mistakes: 0 };
		
		case CONSTANTS.GRID_HIGHLIGHT:
			return { ...state, active: action.payload };
	
        case CONSTANTS.MENU_OPEN:
            let timerOn = ( action.payload.id ) ? false : true; // pause timer when menu open
			return { ...state, openDialog: action.payload.id, timerOn };

		case CONSTANTS.SET_DIFFICULTY:
			return { ...state, difficulty: action.payload.difficulty };

		case CONSTANTS.SET_INPUT:

			let index = state.grid.findIndex( cell => cell.column === action.payload.column && cell.row === action.payload.row ),
			cell = { ...state.grid[ index ] },
			value = Number( action.payload.value ),
            mistakes = Number( state.mistakes ),
            clearNotes = false;

			grid = [ ...state.grid.map( cell => ({ ...cell }) ) ];

			// don't do anything for a cell that already has values
			if( cell.input && ( cell.input === cell.value ) ) return { ...state };

			if( state.noteMode ){

                let notes = [ ...cell.notes ],
                noteIndex = notes.indexOf( value );

				if( noteIndex === -1 ){
					notes.push( value );
				} else {
					notes.splice( noteIndex, 1 );
                }
                
                cell.notes = notes;

			} else {

				// clear the value
				if( !action.payload.value ){
					delete cell.input;

				} else {

					// set value to the cell
                    cell.input = value;
                    cell.notes = [];

					// set error if the input was wrong
                    if( cell.value !== value ) ++mistakes;
                    
                    clearNotes = true;
				}

			}

            grid[ index ] = cell;

            // clear notes on other cells
            if( clearNotes ){
                
                grid = grid.map( cell => {

                    let notes = [ ...cell.notes ],
                    index = notes ? notes.indexOf( value ) : -1;

                    if( cell.column === action.payload.column || cell.row === action.payload.row || cell.section === action.payload.section ){
                        if( index > -1 ) notes.splice( index, 1 );
                    }
                    cell.notes = notes;

                    return cell;
                });
            }

			return { ...state, grid, mistakes };

		case CONSTANTS.TOGGLE_NOTE_MODE:
            return { ...state, noteMode: ( !state.noteMode ) };

		default:
			return state;
	}
}

export default app;