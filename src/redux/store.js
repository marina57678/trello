import {
   legacy_createStore,
   compose,
   applyMiddleware,
   combineReducers,
} from "redux";
import thunk from "redux-thunk";

import cardsReducer from "./cardsReducer";
import statusesReducer from "./statusesReducer";

console.log(statusesReducer);
const rootReducer = combineReducers({
   cards: cardsReducer,
   statuses: statusesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk))
);

export default store;
