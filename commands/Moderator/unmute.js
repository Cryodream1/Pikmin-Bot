const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "unmute", // name of the command
    description: "test command", // description

    async run (client, message, args) {
      let muterole = message.guild.roles.cache.find(role => role.name === "muted");
      let muterole2 = message.guild.roles.cache.find(role => role.name === "Muted");
	    let currency = "$"
      if(message.member.hasPermission("KICK_MEMBERS")) {
        let member = message.mentions.members.first()
        if(!member) {
          message.channel.send("mention someone to unmute!")
        } else {
          if(!muterole) {
            if(!muterole2) {
              message.channel.send("Create a mute role!")
            } else {
                member.roles.remove(muterole2)
                message.channel.send("Member has been succesfully unmuted.")
              }
          } else {
              member.roles.remove(muterole)
              message.channel.send("Member has been succesfully muted.")
            }
        }
      }
    }
}