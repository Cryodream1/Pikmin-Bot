const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "tempmute", // name of the command
    description: "test command", // description

    async run(client, message, args) {
      let muterole = message.guild.roles.cache.find(role => role.name === "muted");
      let muterole2 = message.guild.roles.cache.find(role => role.name === "Muted");
	    let currency = "$"
      let member = message.mentions.members.first()
      let number = message.content.substring(9)
      let time = parseInt(number.split(" ")[2])
      const ms = require("pretty-ms")
      if(message.member.hasPermission("KICK_MEMBERS")) {
        if(!member) {
          return message.channel.send("Mention someone to mute!")
        }
        if(!time) {
          return message.channel.send("Give me an amount of time to mute them for")
        }
          if(!muterole) {
            if(!muterole2) {
              message.channel.send("No mute role found, attempting to create one")
              let muterole3 = await message.guild.roles.create({
                data : {
                    name : 'muted',
                    permissions: []
                }
              });
              message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                await channel.createOverwrite(muterole3, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
                })
              });
              message.guild.channels.cache.filter(c => c.type === 'voice').forEach(async (channel, id) => {
                await channel.createOverwrite(muterole3, {
                  CONNECT: false,
                })
              });
              member.roles.add(muterole3)
              setTimeout(() => message.channel.send('Muted role sucessfully created and the member has been muted.'), 1500)
              const time2 = time*=1000
              setTimeout(() => {
              member.roles.remove(muterole3)
              }, time2)
            } else {
                member.roles.add(muterole2)
                message.channel.send("Member has been succesfully muted.")
                const time2 = time*=1000
                setTimeout(() => {
                member.roles.remove(muterole2)
              }, time2)
              }
          } else {
              member.roles.add(muterole)
              message.channel.send("Member has been succesfully muted.")
              const time2 = time*=1000
              setTimeout(() => {
                member.roles.remove(muterole)
              }, time2)
        }
      }
    }
}
