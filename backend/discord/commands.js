import asyncHandler from 'express-async-handler'
import asciiTable from 'ascii-table'
import { MessageEmbed } from 'discord.js'
import Emote from '../models/emoteModel.js'
import Oauth from '../models/oauthModel.js'

const ping = {
  name: 'ping',
  description: 'Ping!',
  execute(msg, args) {
    const timeTaken = Date.now() - msg.createdTimestamp
    msg.reply(`Pong! This message had a latency of ${timeTaken}ms`)
  }
}

const emote = {
  name: 'emote',
  description: 'Emote',
  execute: asyncHandler(async (msg, args) => {
    if (args.length <= 0) return
    const emote = await Emote.findOne({
      name: args.shift().toLowerCase()
    })
    if (!emote) return
    msg.channel.send(new MessageEmbed().setFooter(msg.author.username).setImage(emote.image)).then(msg.delete())
  })
}

const addEmote = {
  name: 'addemote',
  description: 'Add emote',
  execute: asyncHandler(async (msg, args) => {
    const discordOauth = await Oauth.findOne({ "profile.id": msg.author.id })
    if (!discordOauth) {
      msg.channel.send('You must register in order to use this command')
    } else {
      if (args.length <= 1) return
      const [ emoteName, emoteImage ] = args
      const emote = new Emote({
        name: emoteName,
        image: emoteImage
      })
      try {
        await emote.save()
        msg.reply(`${emoteName} added`).then(msg.delete())
      } catch (err) {
        msg.channel.send(err.message)
      }
    }
  })
}

const listEmotes = {
  name: 'listemotes',
  description: 'List emotes',
  execute: asyncHandler(async (msg, args) => {
    const emotes = await Emote.find({})
    if (!emotes) return
    let emoteArr = []
    emotes.forEach((val, key) => {
      emoteArr.push([val.name])
    })
    const table = new asciiTable('Emotes').fromJSON({
      heading: 'Emotes',
      rows: emoteArr
    })
    msg.channel.send('```' + table.toString() + '```')
  })
}

export default {
  ping, emote, listEmotes, addEmote
}