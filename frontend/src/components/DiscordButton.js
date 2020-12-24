import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import Loader from './Loader'
import axios from 'axios'
import { revokeOauth } from '../actions/userActions'

const styledButton = styled.button`
  background-color: ${props => props.outline ? '' : '#7289DA'};
  color: ${props => props.outline ? '#7289DA' : 'white'};
  border-color: #7289DA;
  
  &:hover {
    background-color: #5d6fb4;
    border-color: #5d6fb4;
    color: white;
  }

  &:focus {
    background-color: #5d6fb4;
    border-color: #7289DA;
    color: white;
    box-shadow: 0 0 0 0.2rem rgb(114 137 218);
  }

  &:not(:disabled):not(.disabled).active, &:not(:disabled):not(.disabled):active, .show>&.dropdown-toggle {
    background-color: #5d6fb4;
    border-color: #7289DA;
    color: white;
    box-shadow: 0 0 0 0.2rem rgb(114 137 218);
  }

  &:not(:disabled):not(.disabled).active:focus, &:not(:disabled):not(.disabled):active:focus, .show>&.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem rgb(93 111 180);
  }

  &.disabled, &:disabled {
    color: #fff;
    background-color: #7289DA;
    border-color: #7289DA;
}
`

const DiscordButton = () => {
  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(false)
  const [discordOauthUrl, setDiscordOauthUrl] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userOauthList = useSelector(state => state.userOauthList)
  const { loading, oauth } = userOauthList

  const userOauthRevoke = useSelector(state => state.userOauthRevoke)
  const { loading:oauthRevokeLoading } = userOauthRevoke

  const discordOauth = oauth?.find(o => o.name === 'discord' && o.revoked === false)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`
    }
  }

  const getDiscordOauthUrl = async () => {
    const { data } = await axios.get(`/api/oauth/discord`, config)
    return data
  }

  const onClickHandler = async () => {
    if (discordOauth) {
      dispatch(revokeOauth('discord'))
    } else {
      const url = await getDiscordOauthUrl()
      setDiscordOauthUrl(url)
      setRedirect(true)
    }

  }

  useEffect(() => {
    if (redirect) {
      window.location.assign(discordOauthUrl)
    }
  }, [redirect, discordOauthUrl])

  return (
    <Button outline={discordOauth ? true : false} variant={discordOauth ? 'outline-primary' : 'primary'} disabled={loading} onClick={onClickHandler} type={'button'} as={styledButton}>
      {loading || oauthRevokeLoading ? <><Loader size={'sm'} button/> Loading...</> : 
      <><i className={'fab fa-discord'}></i> {discordOauth ? 'Unlink' : 'Link'} Discord account</>}
    </Button>
  )
}
  
export default DiscordButton