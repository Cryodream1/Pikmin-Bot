const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "ban", // name of the command
    description: "Ban someone", // description
    permissions: "BAN_MEMBERS",

    async run (client, message, args) {
	    let currency = "$"
      let member = message.mentions.first()
      if(!member) {
        message.channel.send("Please mention someone")
      } else {
          member.ban().then(mem => {
            message.channel.send(`Banned ${mem.user.username}!`)
          })
      }
    }
}
