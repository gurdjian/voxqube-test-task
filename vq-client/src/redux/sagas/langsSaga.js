import { call, put, takeEvery } from 'redux-saga/effects'
import axios from "axios"
import {  GET_LANGS } from '../allTypes';
import { setLangs } from '../actions/langsAC';

const getData = (langs) => {
  return  axios.get('http://localhost:3001/voxqube/langs', {langs})
    .then(res => res.data)
}

//2
function* langsWorker(action) {
    try {
      let { langs } = yield call(getData, action.payload);
      langs = langs.map( (lang) => {
        return {lang, checked: true}
      })
      yield put(setLangs(langs) );
    } catch (e) {
       yield put(setLangs( [{lang: `Ошибка получения списка языков: ${e}`, checked: true}] ));
    }
 }

//1
 function* langsWatcher() {
    yield takeEvery(GET_LANGS, langsWorker);
  }
  
  export default langsWatcher;
