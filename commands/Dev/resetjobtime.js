const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "resetjobtime", // name of the command
    description: "Reset the wallet and balance of someone", // description

    async run (client, message, args) {
      let member100 = message.mentions.members.first()
      if(message.author.id === "353353241557204994") {
        if(!member100) {
          await db.delete(`workTimes_${message.author.id}`) 
          message.channel.send("Successfully reset your job time")
        } else {
          let memberid = member100.user.id
          await db.delete(`workTimes_${memberid}`) 
          message.channel.send(`Successfully reset ${member100.user.username}'s job time`)
        }
      } else {
        message.channel.send("Only my developers can use that")
      }
    }
}