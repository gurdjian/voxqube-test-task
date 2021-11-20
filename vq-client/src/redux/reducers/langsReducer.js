import { SET_LANGS, TOGGLE_LANGS } from '../allTypes'

const langsReducer = (state=[], action) => {
  const {type, payload} = action
  switch (type) {
      case SET_LANGS:
          return payload;

      case TOGGLE_LANGS:
          const {lang, checked} = payload;
          console.log('TOGGLE_LANGS ', lang, checked);
          return state.map(el => {
            if (el.lang === lang) {
              el.checked = checked;
            }
            return el;
          });
  
      default:
          return state ;
  }
}

export default langsReducer
