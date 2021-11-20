import { SET_DATA } from '../allTypes'

const dataReducer = (state=[], action) => {
    const {type, payload} = action
    switch (type) {
        case SET_DATA:
            return payload;
    
        default:
           return state ;
    }
}

export default dataReducer
