const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "rng", // name of the command
    description: "Random number generator", // description

    async run (client, message, args) {
	    let currency = "$"
      var range = message.content.substring(5)
      var lower = parseInt(range.split("-")[0])
      var upper = parseInt(range.split("-")[1])
      var max = upper-lower + 1
      var random = Math.floor(Math.random() * max)
      var addedRandom=random + lower
      let embed = new Discord.MessageEmbed()
      .setTitle("Getting The Number")
      .setDescription(":game_die: :game_die: Rolling... :game_die: :game_die:")
      .setColor("BLUE")
      let invalidembed = new Discord.MessageEmbed()
      .setTitle("Invalid command")
      .addField("Example of how to use the command:", ";rng 1-10")
      .setColor("BLUE")
      if(!lower) {
        message.channel.send(invalidembed)
      } else {
        if(!upper) {
          message.channel.send(invalidembed)
        } else {
            message.channel.send(embed)
            let embed2 = new Discord.MessageEmbed()
            .setDescription(':tada: :tada: The number is: ' + addedRandom + ':tada: :tada:')
            .setColor("GREEN")
            setTimeout(() => message.channel.send(embed2), 1500)
          }
      }
    }
}
