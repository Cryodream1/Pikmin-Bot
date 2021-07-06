const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "addwork", // name of the command
    description: "Reset the wallet and balance of someone", // description

    async run (client, message, args) {
      let member100 = message.mentions.members.first()
      let number = message.content.substring(10)
      let worked = await db.get(`workTimes_${message.author.id}`)
      let amount = parseInt(number.split(" ")[1])
      if(message.author.id === "353353241557204994") {
        if(!member100) {
          await db.set(`workTimes_${message.author.id}`, worked + amount) 
          message.channel.send("Successfully reset your job")
        } else {
          let memberid = member100.user.id
          let worked2 = await db.get(`workTimes_${memberid}`)
          await db.set(`workTimes_${memberid}`, worked2 + amount) 
          message.channel.send(`Successfully reset ${membereset.user.username}'s job`)
        }
      } else {
        message.channel.send("Only my developers can use that")
      }
    }
}