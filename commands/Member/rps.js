const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "rps", // name of the command
    description: "Rock paper scissors", // description

    async run (client, message, args) {
      let embwed = new Discord.MessageEmbed()
      .setTitle("Invalid command")
      .addField("Example of how to use the command", ";rps rock")
      let number = message.content.substring(4)
      let choice = number.split(" ")[1]
	    let currency = "$"
      let embedloserock = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is playing rock paper scissors`)
        .setDescription(`You chose rock\n I chose paper\n You lost.`)
      let embedlosepaper = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is playing rock paper scissors`)
        .setDescription(`You chose paper\n I chose scissors\n You lost.`)
      let embedlosescissors = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is playing rock paper scissors`)
        .setDescription(`You chose scissors\n I chose rock\n You lost.`)
      let embedtierock = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is playing rock paper scissors`)
        .setDescription(`You chose rock\n I chose rock\n Its a tie!`)
      let embedtiepaper = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is playing rock paper scissors`)
        .setDescription(`You chose paper\n I chose paper\n Its a tie!`)
      let embedtiescissors = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is playing rock paper scissors`)
        .setDescription(`You chose scissors\n I chose scissors\n Its a tie!`)
      let embedwinrock = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is playing rock paper scissors`)
        .setDescription(`You chose rock\n I chose scissors\n You won!`)
      let embedwinpaper = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is playing rock paper scissors`)
        .setDescription(`You chose paper\n I chose rock\n You won!`)
      let embedwinscissors = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} is playing rock paper scissors`)
        .setDescription(`You chose scissors\n I chose paper\n You won!`)
      if(!choice) {
        message.channel.send(embwed)
      } else {
        if(choice === ("rock")) {
          var randomness = [
            0,
            1,
            2
          ]
          var index2 = Math.floor(Math.random() * randomness.length);
          if (index2 === 0) {
            message.channel.send(embedloserock)
          }
          if (index2 === 1) {
            message.channel.send(embedtierock)
          }
          if (index2 === 2) {
            message.channel.send(embedwinrock)
          }
        }
        if(choice === ("paper")) {
          var randomness = [
          0,
          1,
          2
          ]
          var index2 = Math.floor(Math.random() * randomness.length);
          if (index2 === 0) {
            message.channel.send(embedlosepaper)
          }
          if (index2 === 1) {
            message.channel.send(embedtiepaper)
          }
          if (index2 === 2) {
            message.channel.send(embedwinpaper)
          }
        }
        if(choice === ("scissors")) {
          var randomness = [
            0,
            1,
            2
          ]
          var index2 = Math.floor(Math.random() * randomness.length);
          if (index2 === 0) {
            message.channel.send(embedlosescissors)
          }
          if (index2 === 1) {
            message.channel.send(embedtiescissors)
          }
          if (index2 === 2) {
            message.channel.send(embedwinscissors)
          }
        }
      }
    }
}
