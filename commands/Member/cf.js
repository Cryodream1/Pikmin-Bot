const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "cf", // name of the command
    description: "Just a simple coinflip", // description

    async run (client, message, args) {
	    let currency = "$"
      let embed = new Discord.MessageEmbed()
      .setDescription("Flipping")
      .setColor("BLUE")
      let embed2 = new Discord.MessageEmbed()
      .setDescription("The result is Heads, you win!")
      .setColor("GREEN")
      let embed3 = new Discord.MessageEmbed()
      .setDescription("The result is Tails, you lost.")
      .setColor("RED")
      let embed4 = new Discord.MessageEmbed()
      .setDescription("The result is Heads, you lost.")
      .setColor("RED")
      let embed5 = new Discord.MessageEmbed()
      .setDescription("The result is Tails, you win!")
      .setColor("GREEN")
  
      var winner = [
        0,
        1,
        2,
        3
      ]

      var index = Math.floor(Math.random() * winner.length);
      if(index === 0) {
        function function2() {
          message.channel.send(embed2)
        }
        message.channel.send(embed)
        setTimeout(function2, 1500)
      }  
      if(index === 1) {
      function function3() {
        message.channel.send(embed3)
      }
      message.channel.send(embed)
      setTimeout(function3, 1500)
      }
      if(index === 2) {
      function function4() {
        message.channel.send(embed3)
      }
      message.channel.send(embed)
      setTimeout(function3, 1500)
      }
      if(index === 3) {
        function function3() {
          message.channel.send(embed3)
        }
        message.channel.send(embed)
        setTimeout(function3, 1500)
      }
    }
}