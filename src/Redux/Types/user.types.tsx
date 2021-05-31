// user modeli
export interface User {
    email: string
    password: string
}


export const EMAIL_CHANGED = "EMAIL_CHANGED"
export const PASSWORD_CHANGED = "PASSWORD_CHANGED"
export const USERNAME_CHANGED = "USERNAME_CHANGED"
export const REGISTER_CHANGED = "REGISTER_CHANGED"
export const LOGIN_CHANGED = "LOGIN_CHANGED"
// kayıt reducer action
interface RegisterAction {
    type: typeof REGISTER_CHANGED,
    payload: User
}

interface LoginAction {
    type: typeof LOGIN_CHANGED
    payload: User
}


export type UserActionTypes = RegisterAction | LoginAction