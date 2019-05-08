import locales from '../data/locales.json';

const INITIAL_STATE = {
	notification: {
		type: 'info',
		message: '<i class="icon birthday"></i> Happy Birthday! Kaaaazoooooo!'
	},
	locales,
	labels: {
		loading: 'Loading...'
	},
	menu: [
		{ title: 'search', path: '/', icon: 'search' },
		{ title: 'favorites', path: '/favorites', icon: 'bookmark' },
		{ title: 'suggestions', path: '/suggestions', icon: 'star' },
		{ title: 'donate', path: '/some-donate-path', icon: 'dollar' }
	],
	taxonomies: []
};

const app = ( state = INITIAL_STATE, action ) => {
	switch( action.type ){
		case 'error':
			return { ...state, error: action.payload };
		case 'override locale':
			return { ...state, language: action.payload.toLowerCase() };
		case 'set active':
			let menu = state.menu.map( item => {
				item.active = item.path === action.payload;
				return item;
			});
			return { ...state, menu };
		default:
			return state;
	}
}

export default app;