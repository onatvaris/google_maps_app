import { DELETE_MARKE, Marke, MarkeActionTypes, MarkeInterface, MARKE_CHANGED } from "../Types";

// user: User => user bir User sınıfı
export function setMarkeAction(marke: Marke): MarkeActionTypes {
    return {
        type: MARKE_CHANGED,
        payload: marke
    }
}

export function deleteMarkeAction(marke: MarkeInterface['marke']): MarkeActionTypes {
    console.log(`markessss`, marke)
    return {
        type: DELETE_MARKE,
        payload: marke
    }

}