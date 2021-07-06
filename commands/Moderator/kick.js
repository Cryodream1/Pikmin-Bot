const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "kick", // name of the command
    description: "Kick someone", // description
    permissions: "KICK_MEMBERS",

    async run (client, message, args) {
	    let currency = "$"
      if(message.member.hasPermission("KICK_MEMBERS")) {
      let member = message.mentions.first()
      if(!member) message.channel.send("Please mention someone")
        else {
          member.kick().then(mem => {
            message.channel.send(`Kicked ${mem.user.username}!`)
          })
        }
      } else {
        message.reply("You don't have permission to do that")
      }
    }
}