import {legacy_createStore as createStore, combineReducers,applyMiddleware} from 'redux';
import usersReducer from './users/usersReducers'
import adminUserReducer from './adminUsers/userReducer'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from 'redux-thunk'
const combinedReducers = combineReducers({
    users: usersReducer,
    adminUsers: adminUserReducer
})


const store=createStore(
    combinedReducers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;