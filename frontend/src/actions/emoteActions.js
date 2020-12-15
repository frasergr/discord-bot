import axios from 'axios'
import { 
  EMOTE_LIST_SUCCESS, 
  EMOTE_LIST_REQUEST, 
  EMOTE_LIST_FAIL,
  EMOTE_DETAILS_FAIL,
  EMOTE_DETAILS_REQUEST,
  EMOTE_DETAILS_SUCCESS,
  EMOTE_UPDATE_SUCCESS,
  EMOTE_UPDATE_FAIL,
  EMOTE_UPDATE_REQUEST,
  EMOTE_DELETE_FAIL,
  EMOTE_DELETE_SUCCESS,
  EMOTE_DELETE_REQUEST,
  EMOTE_CREATE_REQUEST,
  EMOTE_CREATE_SUCCESS,
  EMOTE_CREATE_FAIL,
  EMOTE_UPLOAD_IMAGE_REQUEST,
  EMOTE_UPLOAD_IMAGE_SUCCESS,
  EMOTE_UPLOAD_IMAGE_FAIL,
  EMOTE_REVIEW_CREATE_REQUEST,
  EMOTE_REVIEW_CREATE_SUCCESS,
  EMOTE_REVIEW_CREATE_FAIL,
  EMOTE_TOP_REQUEST,
  EMOTE_TOP_SUCCESS,
  EMOTE_TOP_FAIL
} from '../constants/emoteConstants.js'

export const listEmotes = (keyword = '', pageNumber = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: EMOTE_LIST_REQUEST })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/emotes?keyword=${keyword}&pageNumber=${pageNumber}`, config)

    dispatch({
      type: EMOTE_LIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: EMOTE_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listEmoteDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EMOTE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/emotes/${id}`)

    dispatch({
      type: EMOTE_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: EMOTE_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const deleteEmote = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMOTE_DELETE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/emotes/${id}`, config)

    dispatch({ type: EMOTE_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: EMOTE_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const updateEmote = (emote) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMOTE_UPDATE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/emotes/${emote._id}`, emote, config)

    dispatch({ 
      type: EMOTE_UPDATE_SUCCESS,
      payload: data
    })

    dispatch({
      type: EMOTE_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: EMOTE_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const createEmote = (emote) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMOTE_CREATE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(`/api/emotes`, emote, config)

    dispatch({ 
      type: EMOTE_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: EMOTE_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const uploadImageEmote = (file) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMOTE_UPLOAD_IMAGE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data: { url } } = await axios.post(`/api/upload`, file, config)

    dispatch({ 
      type: EMOTE_UPLOAD_IMAGE_SUCCESS,
      payload: url
    })
  } catch (error) {
    dispatch({
      type: EMOTE_UPLOAD_IMAGE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const createEmoteReview = (emoteId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMOTE_REVIEW_CREATE_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.post(`/api/emotes/${emoteId}/reviews`, review, config)

    dispatch({ type: EMOTE_REVIEW_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: EMOTE_REVIEW_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listTopEmotes = () => async (dispatch) => {
  try {
    dispatch({ type: EMOTE_TOP_REQUEST })

    const { data } = await axios.get(`/api/emotes/top`)

    dispatch({
      type: EMOTE_TOP_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: EMOTE_TOP_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}