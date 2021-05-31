
import { UserActionTypes, REGISTER_CHANGED, User, LOGIN_CHANGED } from '../Types';



const initialState: User = {
    email: '',
    password: '',
};

export function userReducer(state = initialState, action: UserActionTypes): User {
    switch (action.type) {
        case REGISTER_CHANGED: {
            return {
                email: action.payload.email,
                password: action.payload.password,
            }
        }
        case LOGIN_CHANGED: {
            return {
                email: action.payload.email,
                password: action.payload.password,
            }
        }
        default:
            return state
    }
};
