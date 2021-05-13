import asyncHandler from 'express-async-handler'
import { getDiscordProfile } from '../discord/api.js'

const fetchOauthProfile = asyncHandler(async (name, token) => {
  switch (name) {
    case 'discord':
      const data = await getDiscordProfile(token)
      return {
        id: data.id,
        userName: data.username,
        discriminator: data.discriminator,
        avatar: data.avatar
      }
  }
})

export default fetchOauthProfile