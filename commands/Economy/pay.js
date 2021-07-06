const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "pay", // name of the command
    description: "Pay someone money", // description

    async run (client, message, args) {
      let number = message.content.substring(4)
      let amount = parseInt(number.split(" ")[2])
      let member = message.mentions.members.first()
      let memberid = member.id
      let currentWalletBalance = await db.get(`wallet_${message.author.id}`)
      let currentBankBalance = await db.get(`bank_${message.author.id}`)
      let currentWalletBalance2 = await db.get(`wallet_${memberid}`)
      let currentBankBalance2 = await db.get(`bank_${memberid}`)
      if(currentWalletBalance === null) currentWalletBalance = 0
      if(currentBankBalance === null) currentBankBalance = 0
      if(currentWalletBalance2 === null) currentWalletBalance2 = 0
      if(currentBankBalance2 === null) currentBankBalance2 = 0
      if(currentWalletBalance < amount) {
        message.channel.send("You dont have enough money")
      } else {
        db.set(`wallet_${message.author.id}`, currentWalletBalance - amount)
        db.set(`wallet_${memberid}`, currentWalletBalance2 + amount)
        message.channel.send(`${message.author.username}, you payed ${member} ${amount}${currency}`)
      }
    }
}