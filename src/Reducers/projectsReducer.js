import * as A from '../Constants/actions'

export default function projectsReducer(state, action) {

    let newState;
    switch (action.type) {
        case A.LOAD_CONFIRMED_PROJECTS_FROM_SERVER:
            newState = action.payload;
            break;

        default: newState = state;
    }

    return newState;
}