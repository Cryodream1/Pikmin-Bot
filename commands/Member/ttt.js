const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "ttt", // name of the command
    description: "Tic tac toe", // description

    async run (client, message, args) {
	    let currency = "$"
      const member = message.mentions.members.first() 
      if(!member) return message.channel.send('Can you please specify a member')

      new tictactoe({
        player_two: member, 
        message: message
      })
    }
}
