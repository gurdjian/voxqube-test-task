import { GET_DATA } from "../allTypes"

export const getData = (langs) => {
    return {
        type: GET_DATA,
        payload: langs,
    }
}
