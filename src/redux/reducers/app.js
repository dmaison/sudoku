import * as ACTIONS from '../actions/app';

const INITIAL_STATE = {
    notifications: [
        {
            severity: 'success',
            message: 'test'
        }
    ]
};

const reducer = ( state=INITIAL_STATE, action ) => {

    const notifications = [ ...state.notifications ];

    switch( action.type ){

        case ACTIONS.TOAST_ADD:
            notifications.push( action.payload );
            return { ...state, notifications };

        case ACTIONS.TOAST_REMOVE:
            notifications.splice( action.payload, 1 );
            return { ...state, notifications };

        default:
            return { ...state };

    }

};

export default reducer;