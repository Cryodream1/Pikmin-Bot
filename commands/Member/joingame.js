const Discord = require('discord.js')

module.exports = {
    name: "joingame", // name of the command
    description: "Have someone join the game", // description

    async run (client, message, args) {
      let number = message.content.substring(4)
      let username = number.split(" ")[1]
      let embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username} would like to join the game`)
      .setDescription(`Their username is ${username}`)
      .setTimestamp()
      let name = message.author.username
      if(!username) {
        message.channel.send("Please provide a username")
      } else {
        message.channel.send(embed)
        let staffchannel = message.guild.channels.cache.find(channel => channel.name === "ea")
        staffchannel.send(`${name} wants to join the game, their username is ${username}`)
      }
    }
}
