const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "reset", // name of the command
    description: "Reset the wallet and balance of someone", // description

    async run (client, message, args) {
      let member100 = message.mentions.members.first()
      if(message.author.id === "353353241557204994") {
        if(!member100) {
          await db.set(`wallet_${message.author.id}`, 0)
          await db.set(`bank_${message.author.id}`, 0)
          message.channel.send("Successfully reset your bank and wallet!")
        } else {
          let memberid = member100.user.id
          await db.set(`wallet_${memberid}`, 0)
          await db.set(`bank_${memberid}`, 0)
          message.channel.send(`Successfully reset ${member100.user.username}'s bank and wallet!`)
        }
      } else {
        message.channel.send("Only my developers can use that")
      }
    }
}