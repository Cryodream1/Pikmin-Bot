const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "ban", // name of the command
    description: "Ban someone", // description

    async run (client, message, args) {
      if(message.member.hasPermission("BAN_MEMBERS") || (message.member.hasPermission("ADMINISTRATOR"))) {
	    let currency = "$"
      let member = message.mentions.members.first()
      if(!member) {
        message.channel.send("Please mention someone")
      } else {
          member.ban().then(mem => {
            message.channel.send(`Banned ${mem.user.username}!`)
          })
      }
      } else(message.channel.send("You dont have the right permissions!"))
    }
}
