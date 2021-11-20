import { GET_LANGS, SET_LANGS, TOGGLE_LANGS } from "../allTypes"

export const getLangs = (langs) => {
    return {
        type: GET_LANGS,
        payload: langs,
    }
}

export const setLangs = (langs) => {
    return {
        type: SET_LANGS,
        payload: langs,
    }
}

export const toggleLangs = (lang, checked) => {
    return {
        type: TOGGLE_LANGS,
        payload: {lang, checked},
    }
}
