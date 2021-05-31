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

// kayıt reducer action
interface SetMarkeAction {
    type: typeof MARKE_CHANGED,
    payload: Marke
}



export type MarkeActionTypes = SetMarkeAction