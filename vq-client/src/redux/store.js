import { applyMiddleware, createStore } from "redux";
import { initState } from "./initState";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

export default store




