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

        case CONSTANTS.GRID_CLEAR_NOTE:
            return { ...state, clear: action.payload };

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

		case CONSTANTS.TOGGLE_NOTE_MODE:
            return { ...state, noteMode: !state.noteMode };
            
        case CONSTANTS.TRACK_MISTAKE:
			return { ...state, mistakes: ( state.mistakes + 1 ) };

		default:
			return state;
	}
}

export default app;