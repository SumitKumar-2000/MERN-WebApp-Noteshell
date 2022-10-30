import { combineReducers, createStore } from "redux";
import { userReducer } from "../reducers/userAuth";
import { searchNoteReducer } from "../reducers/userNotes";

const reducer = combineReducers({
  user: userReducer,
  searchedNote : searchNoteReducer
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
