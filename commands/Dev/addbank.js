const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "addbank", // name of the command
    description: "Add to the bank", // description

    async run (client, message, args) {
      if(message.author.id === "353353241557204994")
      {
        let number = message.content.substring(8)
        let amount = parseInt(number.split(" ")[1])
        let memberadd = message.mentions.members.first()
        if(!amount) {
          message.channel.send("You idiot you did it backwards again")
        } else {
            if(!memberadd) {
            let currentBalance = await db.get(`bank_${message.author.id}`)
            if(currentBalance === null) currentBalance = 0
            await db.set(`bank_${message.author.id}`, currentBalance + amount)
            message.channel.send(`Sucessfully added ${amount}${currency} to your bank`)
            } else {
                let memberaddid = memberadd.user.id
                let currentBalance2 = await db.get(`bank_${memberaddid}`)
                if(currentBalance2 === null) currentBalance2 = 0
                await db.set(`bank_${memberaddid}`, currentBalance2 + amount)
                message.channel.send(`Successfully added ${amount}${currency} to ${memberadd.user.username}'s bank'`)
              }
          }
      } else {
      message.channel.send("You cant use that")
      } 
    }
}