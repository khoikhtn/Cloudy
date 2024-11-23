import {combineReducers } from 'redux'
import FavorReducer from './favorReducer'
import ScreenReducer from './updatedScreen'
import PackReducer from './addPackReducer'
import UserReducer from './updatedUser'

const myReducer = combineReducers({
    favorList: FavorReducer,
    screenList: ScreenReducer,
    packList: PackReducer,
    userData: UserReducer
})

export default (state, action) => myReducer(state, action)