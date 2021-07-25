const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "addticketsystem", // name of the command
    description: "test command", // description

    async run (client, message, args) {
      const channel = message.mentions.channels.first()
      if(!channel) {
        message.channel.send('Please mention a channel')
        return
      }
      
      const embed = new Discord.MessageEmbed
      .setColor('BLUE')
      .setTitle('Tickets')
      .setDescription('Want to talk to a staff member about a problem or suggestion?\nThen open a ticket here')
      .setFooter(':D')
      message.channel.send(embed)

    }
}
