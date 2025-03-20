import * as A from '../Constants/actions';

export default function donationsReducer(state, action) {

    let newState;
    switch (action.type) {
        case A.LOAD_LATEST_DONATIONS_FROM_SERVER:
            newState = action.payload;
            break;

        default: newState = state;
    }

    return newState;
}