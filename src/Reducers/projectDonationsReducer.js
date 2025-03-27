import * as A from '../Constants/actions';

export default function projectDonationsReducer(state, action) {

    let newState;
    switch (action.type) {
        case A.LOAD_PROJECT_DONATIONS_FROM_SERVER:
            newState = action.payload;
            break;

        default: newState = state;
    }

    return newState;
}