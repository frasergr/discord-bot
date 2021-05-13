import axios from 'axios'

const getConfig = (token) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
}

const getDiscordProfile = async (token) => {
  const { data } = await axios.get(`${process.env.DISCORD_API_BASE_URL}/users/@me`, getConfig(token))
  return data
}

export {
  getDiscordProfile
}