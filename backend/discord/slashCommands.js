import asyncHandler from 'express-async-handler'
import Oauth from '../models/oauthModel.js'
import generateUserRegisterToken from '../utils/generateUserRegisterToken.js'

const register = {
  name: 'register',
  description: 'Register with bot',
  execute: asyncHandler(async (bot, interaction) => {
    const discordId = interaction.member.user.id
    const user = await Oauth.findOne({ "profile.id": discordId + 'a' }).populate('user')
    let response
    if (user) {
      response = {
        data: {
          type: 4,
          data: {
            content: `You are already registered. [View profile](${process.env.HOST_URL}/profile)`,
            flags: 64
          }
        }
      }
    } else {
      const userRegisterToken = await generateUserRegisterToken(discordId)
      response = {
        data: {
          type: 4,
          data: {
            content: `Click here to register: [Register](${process.env.HOST_URL}/register?registerToken=${userRegisterToken.token})`,
            flags: 64
          }
        }
      }
    }
    bot.api.interactions(interaction.id, interaction.token).callback.post(response)
  })
}

const hello = {
  name: 'hello',
  description: 'Replies with Hello World!',
  execute: asyncHandler(async (bot, interaction) => {
    bot.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Hello World!",
          flags: 64
        }
      }
    })
  })
}

export default { register, hello }