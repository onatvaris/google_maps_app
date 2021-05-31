import { Marke, MarkeActionTypes, MARKE_CHANGED } from "../Types";

// user: User => user bir User sınıfı
export function setMarkeAction(marke: Marke): MarkeActionTypes {
    return {
        type: MARKE_CHANGED,
        payload: marke
    }
}
