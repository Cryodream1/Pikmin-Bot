const Discord = require('discord.js')

module.exports = {
    name: "purge", // name of the command
    description: "Delete alot of messages", // description
    permissions: "KICK_MEMBERS",

    async run (client, message, args) {
      let arg = message.content.split(" ")
      if(message.member.hasPermission("MANAGE_MESSAGES")) {
      let clear = arg[1];
      if(!clear) return message.channel.send(`:x: | \`Incorrect usage of command you need to provide an amount of messages to Clear.\` 
      **Example:** \`;purge 50\` `)
      if(isNaN(clear)) return message.channel.send(":x: | ``Please Put a Valid Number to Clear messages.``")
      if(clear > 100) return message.channel.send(":x: | ``I can't Clear more than 100 messages.``")
      if(clear < 1) return message.channel.send(":x: | ``You cannot Clear less than 1 message.``")

      message.channel.bulkDelete(clear)
      message.channel.send(`:white_check_mark: | \`Succesfully cleared ${clear} messages! | If purge fails please make sure I have MANAGE_MESSAGES to make the purge seccessful.\` `)
      .then(message => 
        message.delete({timeout: 10000})
      )
      } else {
        message.reply("You dont have perms!")
      } 
    }
}