import { Client, Collection } from 'discord.js'
import botCommands from './commands.js'

const discordBot = () => {
  const bot = new Client()
  bot.commands = new Collection()
  bot.on('error', console.error)

  bot.login(process.env.DISCORD_AUTH_TOKEN)

  bot.once('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`)
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