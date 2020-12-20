import { Client, Collection } from 'discord.js'
import botCommands from './commands.js'

const discordBot = () => {
  const bot = new Client()
  bot.commands = new Collection()
  bot.on('error', console.error)

  bot.login(process.env.DISCORD_AUTH_TOKEN)

  bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`)

    // const createAPIMessage = async (interaction, content) => {
    //   const apiMessage = await APIMessage.create(bot.channels.resolve(interaction.channel_id), content)
    //     .resolveData()
    //     .resolveFiles()
    
    //   return { ...apiMessage.data, files: apiMessage.files }
    // }

    // bot.api.applications(bot.user.id).guilds(process.env.DISCORD_GUILD_ID).commands.post({
    //   data: {
    //     name: "hello",
    //     description: "Replies with Hello World"
    //   }
    // })

    // bot.api.applications(bot.user.id).guilds(process.env.DISCORD_GUILD_ID).commands.post({
    //   data: {
    //     name: "echo",
    //     description: "Echoes your text as an embed",
    //     options: [
    //       {
    //         name: "content",
    //         description: "Content of the embed",
    //         type: 3,
    //         required: true,
    //       }
    //     ]
    //   }
    // })

    // bot.ws.on('INTERACTION_CREATE', async interaction => {
    //   const command = interaction.data.name.toLowerCase()
    //   const args = interaction.data.options

    //   if (command === 'hello') {
    //     bot.api.interactions(interaction.id, interaction.token).callback.post({
    //       data: {
    //         type: 4,
    //         data: {
    //           content: "Hello World!"
    //         }
    //       }
    //     })
    //   }

    //   if (command === 'echo') {
    //     const description = args.find(arg => arg.name.toLowerCase() === 'content').value
    //     const embed = new MessageEmbed()
    //       .setTitle("Echo")
    //       .setDescription(description)
    //       .setAuthor(interaction.member.user.username)

    //     bot.api.interactions(interaction.id, interaction.token).callback.post({
    //       data: {
    //         type: 4,
    //         data: await createAPIMessage(interaction, embed)
    //       }
    //     })
    //   }
    // })
  })

  Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key])
  })

  bot.on('message', msg => {
    if (msg.author.bot) return
    if (!msg.content.startsWith(process.env.DISCORD_COMMAND_PREFIX)) return

    const args = msg.content.split(/ +/)
    const command = args.shift().toLowerCase().substring(1)
    console.info(`Called command: ${command}`)
  
    if (!bot.commands.has(command)) return
  
    try {
      bot.commands.get(command).execute(msg, args)
    } catch (error) {
      console.error(error)
      msg.reply('there was an error trying to execute that command!')
    }
  })
}

export default discordBot