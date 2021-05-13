import { 
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_UPDATE_RESET,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_OAUTH_REGISTER_FAIL,
  USER_OAUTH_REGISTER_REQUEST,
  USER_OAUTH_REGISTER_SUCCESS,
  USER_OAUTH_LIST_FAIL,
  USER_OAUTH_LIST_REQUEST,
  USER_OAUTH_LIST_SUCCESS,
  USER_OAUTH_LIST_RESET,
  USER_OAUTH_REVOKE_FAIL,
  USER_OAUTH_REVOKE_REQUEST,
  USER_OAUTH_REVOKE_SUCCESS,
  USER_CHECK_REGISTER_TOKEN_REQUEST,
  USER_CHECK_REGISTER_TOKEN_SUCCESS,
  USER_CHECK_REGISTER_TOKEN_FAIL,
} from '../constants/userConstants.js'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userOauthRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_OAUTH_REGISTER_REQUEST:
      return { loading: true }
    case USER_OAUTH_REGISTER_SUCCESS:
      return { loading: false, success: true }
    case USER_OAUTH_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userOauthListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_OAUTH_LIST_REQUEST:
      return { loading: true }
    case USER_OAUTH_LIST_SUCCESS:
      return { loading: false, oauth: action.payload, success: true }
    case USER_OAUTH_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_OAUTH_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const userOauthRevokeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_OAUTH_REVOKE_REQUEST:
      return { loading: true }
    case USER_OAUTH_REVOKE_SUCCESS:
      return { loading: false, oauth: action.payload, success: true }
    case USER_OAUTH_REVOKE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userCheckRegisterTokenReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case USER_CHECK_REGISTER_TOKEN_REQUEST:
      return { loading: true }
    case USER_CHECK_REGISTER_TOKEN_SUCCESS:
      return { loading: false, success: true }
    case USER_CHECK_REGISTER_TOKEN_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}