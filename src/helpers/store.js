import { createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/root.reducer'

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,        
    )
)