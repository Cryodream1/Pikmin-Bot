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
    name: "deposit", // name of the command
    description: "Deposit your money into the bank", // description

    async run (client, message, args) {
      
      let number = message.content.substring(8)
      let amount = parseInt(number.split(" ")[1])
      let amount2 = number.split(" ")[1]
      let user = message.author
      Data.findOne({
        userID: user.id
      }, (err, data) => {
        if(err) console.log(err)
          let invalidembed = new Discord.MessageEmbed()
          .setTitle("Invalid command")
          .addField("Example of how to use the command:", ";deposit 100")
          .setColor("BLUE")
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        if(!data) {
          const newData = new Data({
            name: user.username,
            userID: user.id,
            lb: "all",
            job: "",
            wallet: 0,
            bank: 0,
            total: 0,
            daily: 0,
            weekly: 0,
            monthly: 0,
            yearly: 0,
            item1: 0,
            item2: 0,
            item3: 0,
            item4: 0,
            item5: 0,
            item6: 0,
            item7: 0,
            item8: 0,
          })
          newData.save().catch(err => console.log(err))
          let noamount = new Discord.MessageEmbed()
          .setTitle("Invalid amount")
          .setDescription(`You're trying to deposit ${currency}${amount} when you only have ${currency}${data.wallet}`)
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          if(!amount) return message.channel.send(invalidembed)
          if(amount > data.wallet) return message.channel.send(noamount)
          if(data.wallet === null || data.wallet === 0) return message.channel.send("You dont have any money!")
          } else {
          let invalidembed = new Discord.MessageEmbed()
          .setTitle("Invalid command")
          .addField("Example of how to use the command:", ";deposit 100")
          .setColor("BLUE")
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          let noamount = new Discord.MessageEmbed()
          .setTitle("Invalid amount")
          .setDescription(`You're trying to deposit ${currency}${amount} when you only have ${currency}${data.wallet}`)
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          
          if(!amount) { 
            if(amount2 === "all") {
              let amount3 = data.wallet
              let embed2 = new Discord.MessageEmbed()
              .setTitle(`${message.author.username} you deposited ${currency}${amount3} into your bank`)
              .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
              data.wallet -= amount3
              data.bank += amount3
              data.total = (data.wallet + data.bank)
              data.save().catch(err => console.log(err))
              
              return message.channel.send(embed2)
            } else {
            return message.channel.send(invalidembed)
            }
          }
          if(amount > data.wallet) return message.channel.send(noamount)
          if(data.wallet === null || data.wallet === 0) return message.channel.send("You dont have any money!")
          let embed = new Discord.MessageEmbed()
          .setTitle(`You succesfully deposited ${currency}${amount} into your bank`)
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          data.wallet -= amount
          data.bank += amount
          data.total = (data.wallet + data.bank)
          data.save().catch(err => console.log(err))

          return message.channel.send(embed)
        }
      })
    }
}