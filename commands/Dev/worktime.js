const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "worktime", // name of the command
    description: "Reset the wallet and balance of someone", // description

    async run (client, message, args) {
      let member100 = message.mentions.members.first()
      let number = message.content.substring(10)
      let worked = await db.get(`workTimes_${message.author.id}`)
      let amount = parseInt(number.split(" ")[1])
      if(message.author.id === "353353241557204994") {
        if(!member100) {
          if(worked === null) worked = 0
          message.channel.send(`You have worked for ${worked} hours`)
        } else {
          let memberid = member100.user.id
          let worked2 = await db.get(`workTimes_${memberid}`)
          if(worked2 === null) worked2 = 0
          message.channel.send(`${member100.user.username} has worked for ${worked2} hours`)
        }
      } else {
        message.channel.send("Only my developers can use that")
      }
    }
}