import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import axios from 'axios'

const styledButton = styled.button`
    background-color: #7289DA;
    border-color: #7289DA;
    color: white;

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
`

const DiscordButton = () => {
  const [redirect, setRedirect] = useState(false)
  const [discordOauthUrl, setDiscordOauthUrl] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const getDiscordOauthUrl = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`/api/oauth/discord`, config)
    setDiscordOauthUrl(data)
    setRedirect(true)
  }

  useEffect(() => {
    if (redirect) {
      window.location.assign(discordOauthUrl)
    }
  }, [redirect, discordOauthUrl])

  return (
    <Button onClick={getDiscordOauthUrl} type={'button'} as={styledButton}>
      <i className={'fab fa-discord'}></i> Link Discord account
    </Button>
  )
}
  
export default DiscordButton