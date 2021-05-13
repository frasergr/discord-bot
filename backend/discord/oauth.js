import axios from 'axios'
import qs from 'qs'

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const getDiscordOauthUrl = () => `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.DISCORD_REDIRECT_URI)}&response_type=code&scope=${process.env.DISCORD_SCOPES}&prompt=none`

const getDiscordOauth = async (code = null, refreshToken = null) => {
  const form = {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
    code: code,
    refresh_token: refreshToken,
    grant_type: refreshToken ? 'refresh_token' : 'authorization_code',
    scope: refreshToken ? 'identify' : null
  }

  return await axios.post(`https://discord.com/api/oauth2/token`, qs.stringify(form), config)
}

const revokeDiscordOauth = async (token) => {
  const form = {
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
    token
  }
  
  return await axios.post(`https://discord.com/api/oauth2/token/revoke`, qs.stringify(form), config)
}

export {
  getDiscordOauth,
  revokeDiscordOauth,
  getDiscordOauthUrl
}