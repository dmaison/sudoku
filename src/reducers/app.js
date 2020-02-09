import { check, commit, create, fill } from '../utilities/grid'
import { gameTime, get, save } from '../utilities/data'
import * as CONSTANTS from '../constants/actions/app'
import { GAME_SAVED, GAME_WIN } from '../constants/menu'
import { LEVEL_EASY } from '../constants/difficulties'

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
	difficulty: LEVEL_EASY,
    errors: 0,
    game: 1,
	grid: create(),	
	mistakes: 0,
	noteMode: false,
	openDialog: null,
    saves: get(),
	timerOn: true,
	winTime: null
};

const app = ( state = INITIAL_STATE, action ) => {

    var grid;

	switch( action.type ){

		case CONSTANTS.GAME_LOAD:
			let game = state.saves.find( ( save, index ) => index === action.payload.index );
			return { ...state, difficulty: game.difficulty, mistakes: game.mistakes, newTime: game.time, grid: game.grid, game: state.game + 1 };

        case CONSTANTS.GAME_SAVE:
            save( state.grid, state.difficulty, state.mistakes, gameTime() );
            return { ...state, openDialog: GAME_SAVED, saves: get() };

		case CONSTANTS.GRID_RESET:
			grid = create();
			fill( grid );
			grid = commit( state.difficulty, grid );
			return { ...state, game: ( state.game + 1 ), grid, mistakes: 0, winTime: null, timerOn: true, noteMode: false };
		
		case CONSTANTS.GRID_HIGHLIGHT:
			return { ...state, active: action.payload };
	
        case CONSTANTS.MENU_OPEN:
			let timerOn = ( action.payload.id ) ? false : true; // pause timer when menu open
			if( state.openDialog === GAME_WIN && action.payload.id === null ) timerOn = false;
			return { ...state, openDialog: action.payload.id, timerOn };

		case CONSTANTS.SET_DIFFICULTY:
			return { ...state, difficulty: action.payload.difficulty };

		case CONSTANTS.SET_INPUT:

			if( state.winTime ) return { ...state };

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

			let complete = check( grid );

			return { ...state, grid, mistakes, timeOn: complete ? false : true, openDialog: complete ? GAME_WIN : null, winTime: complete ? gameTime() : null };

		case CONSTANTS.TOGGLE_NOTE_MODE:
            return { ...state, noteMode: ( !state.noteMode ) };

		default:
			return state;
	}
}

export default app;