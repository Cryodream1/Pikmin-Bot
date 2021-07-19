const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "setjob", // name of the command
    description: "test command", // description

    async run (client, message, args) {
      let member100 = message.mentions.members.first()
      if(message.author.id === "353353241557204994") {
        let number = message.content.substring(7)
        let argus = number.split(" ")[1]
        if(!member100) {
          await db.set(`job_${message.author.id}`, argus) 
          message.channel.send(`Set your job to ${argus}`)
        } else {
          let memberid = member100.user.id
          await db.set(`job_${memberid}`, argus) 
          message.channel.send(`Successfully set ${member100.user.username}'s job to $`)
        }
      } else {
        message.channel.send("Only my developers can use that")
      }
    }
}
