const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "invite", // name of the command
    description: "Invite the bot to your server", // description

    async run (client, message, args) {
	    let currency = "$"
      let embed = new Discord.MessageEmbed()
      .setTitle("Invite me to your server")
      .setDescription("Here's the invite link!: https://discord.com/api/oauth2/authorize?client_id=857763038161666069&permissions=4294967287&scope=bot")
      .setColor("#277ECD")
      .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL())
      message.channel.send(embed)
    }
}
