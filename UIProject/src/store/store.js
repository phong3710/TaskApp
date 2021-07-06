import {  createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTool } from 'redux-devtools-extension'
import logger from 'redux-logger'
import rootReducer from '../reducers/rootReducer'

const store = createStore( 
    rootReducer, 
   applyMiddleware(thunk ))

export default store