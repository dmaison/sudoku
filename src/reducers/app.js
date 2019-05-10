import { commit, create, fill } from '../utilities/grid';
import * as CONSTANTS from '../constants/app';

const INITIAL_STATE = {
	grid: create()
};

const app = ( state = INITIAL_STATE, action ) => {

	var grid;

	switch( action.type ){

		case CONSTANTS.GRID_RESET:
			grid = [ ...state.grid ];
			fill( grid );
			grid = commit( state.difficulty, grid );
			return { ...state, grid };

		default:
			return state;
	}
}

export default app;