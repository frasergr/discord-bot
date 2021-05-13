import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerOauth } from '../actions/userActions'

const OauthRedirect = ({ location, match }) => {
  const name = match.params.name
  const query = location.search
  const params = new URLSearchParams(query)
  const code = params.get('code')

  const dispatch = useDispatch()
  
  useEffect(() => {
    if (code) {
      dispatch(registerOauth(code, name))
    }
  }, [dispatch, code, name])

  return <Redirect to={{pathname: "/profile", state: {refreshOauth: true}}} />
}
  
export default OauthRedirect