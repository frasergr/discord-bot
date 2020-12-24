import { 
  EMOTE_LIST_FAIL, 
  EMOTE_LIST_REQUEST, 
  EMOTE_LIST_SUCCESS,
  EMOTE_DETAILS_FAIL, 
  EMOTE_DETAILS_REQUEST, 
  EMOTE_DETAILS_SUCCESS,
  EMOTE_DELETE_FAIL,
  EMOTE_DELETE_REQUEST,
  EMOTE_DELETE_SUCCESS,
  EMOTE_UPDATE_FAIL,
  EMOTE_UPDATE_REQUEST,
  EMOTE_UPDATE_RESET,
  EMOTE_UPDATE_SUCCESS,
  EMOTE_CREATE_REQUEST,
  EMOTE_CREATE_SUCCESS,
  EMOTE_CREATE_FAIL,
  EMOTE_CREATE_RESET,
  EMOTE_UPLOAD_IMAGE_REQUEST,
  EMOTE_UPLOAD_IMAGE_SUCCESS,
  EMOTE_UPLOAD_IMAGE_FAIL,
  EMOTE_UPLOAD_IMAGE_RESET,
  EMOTE_REVIEW_CREATE_SUCCESS,
  EMOTE_REVIEW_CREATE_REQUEST,
  EMOTE_REVIEW_CREATE_FAIL,
  EMOTE_REVIEW_CREATE_RESET,
  EMOTE_TOP_REQUEST,
  EMOTE_TOP_SUCCESS,
  EMOTE_TOP_FAIL,
} from '../constants/emoteConstants.js'

export const emoteListReducer = (state = { emotes: [] }, action) => {
  switch (action.type) {
    case EMOTE_LIST_REQUEST:
      return { loading: true, emotes: [] }
    case EMOTE_LIST_SUCCESS:
      return {
        loading: false,
        emotes: action.payload.emotes,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case EMOTE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const emoteDetailsReducer = (state = { emote: {} }, action) => {
  switch (action.type) {
    case EMOTE_DETAILS_REQUEST:
      return { loading: true, ...state }
    case EMOTE_DETAILS_SUCCESS:
      return { loading: false, emote: action.payload }
    case EMOTE_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const emoteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EMOTE_DELETE_REQUEST:
      return { loading: true }
    case EMOTE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case EMOTE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const emoteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EMOTE_UPDATE_REQUEST:
      return { loading: true }
    case EMOTE_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case EMOTE_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case EMOTE_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const emoteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EMOTE_CREATE_REQUEST:
      return { loading: true }
    case EMOTE_CREATE_SUCCESS:
      return { loading: false, success: true, emote: action.payload }
    case EMOTE_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case EMOTE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const emoteUploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case EMOTE_UPLOAD_IMAGE_REQUEST:
      return { loading: true }
    case EMOTE_UPLOAD_IMAGE_SUCCESS:
      return { loading: false, success: true, image: action.payload }
    case EMOTE_UPLOAD_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    case EMOTE_UPLOAD_IMAGE_RESET:
      return {}
    default:
      return state
  }
}

export const emoteReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EMOTE_REVIEW_CREATE_REQUEST:
      return { loading: true }
    case EMOTE_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true }
    case EMOTE_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case EMOTE_REVIEW_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const emoteTopRatedReducer = (state = { emotes: [] }, action) => {
  switch (action.type) {
    case EMOTE_TOP_REQUEST:
      return { loading: true, emotes: [] }
    case EMOTE_TOP_SUCCESS:
      return { loading: false, emotes: action.payload }
    case EMOTE_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}