const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "rr", // name of the command
    description: "test command", // description

    async run (client, message, args) {
      let embed = new Discord.MessageEmbed()
      .setTitle("You're about to have a bad time")
      .setDescription("Never gonna give you up, never gonna let you down, never gonna run around and desert you, never gonna make you cry, never gonna say goodbye, never gonna tell a lie, to hurt you.")
      
      message.channel.send(embed)
    }
}