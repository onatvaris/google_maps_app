import { ActionCreator } from 'redux';
import { EMAIL_CHANGED, PASSWORD_CHANGED, UserActionTypes, UserInterface, USERNAME_CHANGED } from '../Types';


export function emailChanged(email: UserInterface['email']): UserActionTypes {
    return {
        type: EMAIL_CHANGED,
        payload: email
    }
}

export function passwordChanged(passoword: UserInterface['password']): UserActionTypes {
    return {
        type: PASSWORD_CHANGED,
        payload: passoword
    }

}

export function userNameChaned(userName: UserInterface['userName']): UserActionTypes {
    return {
        type: USERNAME_CHANGED,
        payload: userName
    }

}