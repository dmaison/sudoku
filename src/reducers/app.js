import { commit, create, fill } from '../utilities/grid';
import * as CONSTANTS from '../constants/actions/app';

const INITIAL_STATE = {
	grid: create(),
	noteMode: false,
	openDialog: null
};

const app = ( state = INITIAL_STATE, action ) => {

	var grid;

	switch( action.type ){

		case CONSTANTS.GRID_RESET:
			grid = create();
			fill( grid );
			grid = commit( state.difficulty, grid );
			return { ...state, grid };
	
		case CONSTANTS.MENU_OPEN:
			return { ...state, openDialog: action.payload.id };

		case CONSTANTS.SET_DIFFICULTY:
			return { ...state, difficulty: action.payload.difficulty };

		case CONSTANTS.TOGGLE_NOTE_MODE:
			return { ...state, noteMode: !state.noteMode };

		default:
			return state;
	}
}

export default app;