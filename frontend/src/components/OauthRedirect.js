import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerOauth } from '../actions/userActions'

const OauthRedirect = ({ location, match }) => {
  const name = match.params.name
  const query = location.search
  const searchParams = new URLSearchParams(query)

  const dispatch = useDispatch()
  
  useEffect(() => {
    if (searchParams.has('code')) {
      dispatch(registerOauth(searchParams.get('code'), name)) 
    }
  }, [dispatch, searchParams, name])

  return <Redirect to="/profile" />
}
  
export default OauthRedirect