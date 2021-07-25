const Discord = require('discord.js')
const mongoose = require("mongoose")
const privatebotconfig = require('../../../privatebotconfig.json')
const { currency } = require('../../config.json');

mongoose.connect(privatebotconfig.mongoPass, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Data = require("../models/data.js")

module.exports = {
    name: "addtotal", // name of the command
    description: "Add to the total", // description

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
            Data.findOne({
              userID: message.author.id
            }, (err, data) => {
              if(!data) {
                const newData = new Data({
            name: message.author.username,
            userID: message.author.id,
            lb: "all",
            job: "",
            wallet: 0,
            bank: amount,
            total: amount,
            daily: 0,
            weekly: 0,
            monthly: 0,
            yearly: 0,
                })
                newData.save().catch(err => console.log(err))
              } else {
                data.total += amount
                data.save().catch(err => console.log(err))
              }
            })
            message.channel.send(`Sucessfully added ${currency}${amount} to your total`)
            } else {
                let memberaddid = memberadd.user.id
                Data.findOne({
                  userID: memberaddid
                }, (err, data) => {
                  if(!data) {
                    const newData = new Data({
                      name: memberadd.user.username,
                      userID: memberaddid,
                      job: "",
                      wallet: 0,
                      bank: amount,
                      total: amount,
                      daily: 0,
                      weekly: 0,
                      monthly: 0,
                      yearly: 0,
                    })
                    newData.save().catch(err => console.log(err))
                  } else {
                    data.total += amount
                    data.save().catch(err => console.log(err))
                  }
                })
                message.channel.send(`Successfully added ${currency}${amount} to ${memberadd.user.username}'s total'`)
              }
          }
      } else {
      message.channel.send("You cant use that")
      } 
    }
}