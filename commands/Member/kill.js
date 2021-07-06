const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "kill", // name of the command
    description: "Kill someone >:D", // description

    async run (client, message, args) {
    	let currency = "$"
      let victim = message.mentions.users.first()
      if(!victim) message.reply("Mention someone to kill")
      else {
      message.channel.send(`${victim} died lol`)
      }
    }
}