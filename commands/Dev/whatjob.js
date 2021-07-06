const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()

module.exports = {
    name: "whatjob", // name of the command
    description: "Reset the wallet and balance of someone", // description

    async run (client, message, args) {
      let job = await db.get(`job_${message.author.id}`)
      let member100 = message.mentions.members.first()
      let number = message.content.substring(10)
      let amount = parseInt(number.split(" ")[1])
      if(message.author.id === "353353241557204994") {
        if(!member100) {
          if(!job) {
            message.channel.send("You dont have a job lol")
          } else {
          message.channel.send(`Your job is ${job}`)
          }
        } else {
          let memberid = member100.user.id
          let job2 = await db.get(`job_${memberid}`)
          if(!job2) {
            message.channel.send(`${member100.user.username} doesnt have a job`)
          } else {
          message.channel.send(`${member100.user.username}'s job is ${job2}`)
          }
        }
      } else {
        message.channel.send("Only my developers can use that")
      }
    }
}