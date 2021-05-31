
import { MarkeActionTypes, MarkeInterface, MARKE_CHANGED } from '../Types';



const initialState: MarkeInterface = {
    marke: []
};

export function markeReducer(state = initialState, action: MarkeActionTypes): MarkeInterface {
    switch (action.type) {
        case MARKE_CHANGED: {
            return {
                marke: [...state.marke, action.payload]
            }
        }
        default:
            return state
    }
};
