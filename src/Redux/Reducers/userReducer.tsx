
import { EMAIL_CHANGED, PASSWORD_CHANGED, UserInterface, UserActionTypes, USERNAME_CHANGED } from '../Types';



const initialState: UserInterface = {
    email: '',
    password: '',
    userName: ''
};

export function userReducer(state = initialState, action: UserActionTypes): UserInterface {
    switch (action.type) {
        case EMAIL_CHANGED: {
            return {
                ...state,
                email: action.payload
            };
        }
        case PASSWORD_CHANGED: {
            return {
                ...state,
                password: action.payload
            }
        }
        case USERNAME_CHANGED: {
            return {
                ...state,
                userName: action.payload
            }
        }
        default:
            return state
    }
};
