export interface UserInterface {
    userName: String,
    email: string
    password: string
}

export const EMAIL_CHANGED = "EMAIL_CHANGED"
export const PASSWORD_CHANGED = "PASSWORD_CHANGED"
export const USERNAME_CHANGED = "USERNAME_CHANGED"
interface EmailChangedAction {
    type: typeof EMAIL_CHANGED,
    payload: UserInterface['email']
}

interface PasswordChangedAction {
    type: typeof PASSWORD_CHANGED,
    payload: UserInterface['password']
}

interface UserNameChangedAction {
    type: typeof USERNAME_CHANGED,
    payload: UserInterface['userName']
}
export type UserActionTypes = EmailChangedAction | PasswordChangedAction | UserNameChangedAction