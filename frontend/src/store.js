import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  emoteDetailsReducer,
  emoteListReducer,
  emoteDeleteReducer,
  emoteUpdateReducer,
  emoteCreateReducer,
  emoteUploadImageReducer,
  emoteReviewCreateReducer,
  emoteTopRatedReducer
} from './reducers/emoteReducers.js'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userOauthRegisterReducer,
  userOauthListReducer
} from './reducers/userReducers.js'

const reducer = combineReducers({
  emoteList: emoteListReducer,
  emoteDetails: emoteDetailsReducer,
  emoteDelete: emoteDeleteReducer,
  emoteUpdate: emoteUpdateReducer,
  emoteCreate: emoteCreateReducer,
  emoteReviewCreate: emoteReviewCreateReducer,
  emoteUploadImage: emoteUploadImageReducer,
  emoteTopRated: emoteTopRatedReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userOauthRegister: userOauthRegisterReducer,
  userOauthList: userOauthListReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store