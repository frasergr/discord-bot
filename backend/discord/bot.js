import { Client, Collection } from 'discord.js'
import botCommands from './commands.js'
import botSlashCommands from './slashCommands.js'

const discordBot = () => {
  const bot = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })
  bot.commands = new Collection()
  bot.slashCommands = new Collection()
  bot.on('error', console.error)

  bot.login(process.env.DISCORD_AUTH_TOKEN)

  bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`)

    bot.api.applications(bot.user.id).guilds(process.env.DISCORD_GUILD_ID).commands.post({
      data: {
        name: "hello",
        description: "Replies with Hello World"
      }
    })

    bot.api.applications(bot.user.id).guilds(process.env.DISCORD_GUILD_ID).commands.post({
      data: {
        name: "register",
        description: "Registers with bot"
      }
    })

    Object.keys(botSlashCommands).map(key => {
      bot.slashCommands.set(botSlashCommands[key].name, botSlashCommands[key])
    })

    bot.ws.on('INTERACTION_CREATE', async interaction => {
      const command = interaction.data.name.toLowerCase()
      const args = interaction.data.options

      try {
        bot.slashCommands.get(command).execute(bot, interaction)
      } catch (error) {
        console.error(error)
        msg.reply('there was an error trying to execute that command!')
      }

    })
  })

  Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key])
  })

  bot.on('message', msg => {
    if (msg.author.bot) return
    if (!msg.content.startsWith(process.env.DISCORD_COMMAND_PREFIX)) return
    if ((!msg.member.roles.cache.some(role => process.env.DISCORD_ALLOWED_ROLES.split(',').includes(role.name))) && (msg.author.id != msg.guild.ownerID)) return

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