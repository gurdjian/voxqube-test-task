import dataWatcher from "./dataSaga";
import langsWatcher from "./langsSaga";
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
    yield all([
      dataWatcher(),
      langsWatcher(),
    ])
  }
