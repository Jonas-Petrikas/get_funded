import * as A from '../Constants/actions'

export default function projectReducer(state, action) {

    let newState;
    switch (action.type) {
        case A.ADD_SINGLE_PROJECT_ID:
            newState = action.payload;
            break;
        case A.LOAD_SINGLE_PROJECT_FROM_SERVER:
            newState = action.payload;
            break;

        default: newState = state;
    }

    return newState;
}