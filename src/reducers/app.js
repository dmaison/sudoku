import { commit, create, fill } from '../utilities/grid';
import * as CONSTANTS from '../constants/actions/app';

const INITIAL_STATE = {
	grid: create(),
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

		default:
			return state;
	}
}

export default app;