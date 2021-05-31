import { REGISTER_CHANGED, User, UserActionTypes, } from '../Types';

// user: User => user bir User sınıfı
export function registerAction(user: User): UserActionTypes {
    return {
        type: REGISTER_CHANGED,
        payload: user
    }
}

export function loginAction(user: User): UserActionTypes {
    return {
        type: 'LOGIN_CHANGED',
        payload: user,
    }
}