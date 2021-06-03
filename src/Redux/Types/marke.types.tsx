import { LatLng } from "react-native-maps"

// user modeli
export interface Marke {
    latitude?: number
    longitude?: number
    callout: string
}

export interface MarkeInterface {
    marke: Marke[]
}

export const MARKE_CHANGED = "MARKE_CHANGED"
export const DELETE_MARKE = "DELETE_MARKE"
// kayıt reducer action
interface SetMarkeAction {
    type: typeof MARKE_CHANGED,
    payload: Marke
}

interface DeleteMarkeAction {
    type: typeof DELETE_MARKE
    payload: MarkeInterface['marke']
}



export type MarkeActionTypes = SetMarkeAction | DeleteMarkeAction