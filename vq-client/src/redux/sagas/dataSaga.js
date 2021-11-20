import { call, put, takeEvery } from 'redux-saga/effects'
import axios from "axios"
import { GET_DATA, SET_DATA} from '../allTypes';

const getData = (langs) => {
  return  axios.post('http://localhost:3001/voxqube', {langs})
    .then(res => res.data)
}

//2
function* dataWorker(action) {
    try {
      const { voxqubes } = yield call(getData, action.payload);
      yield put({type: SET_DATA, payload: voxqubes });
    } catch (e) {
       yield put({type: SET_DATA, payload: 
        [
          {
          language: "Ошибка",
          providerLanguage: "Ошибка-RU",
          name: "Ошибка",
          id: "Ошибка",
          sex: "Ошибка",
          provider: "Ошибка",
          flags: []
          }
        ]
      });
    }
 }

//1
 function* dataWatcher() {
    yield takeEvery(GET_DATA, dataWorker);
  }
  
  export default dataWatcher;
