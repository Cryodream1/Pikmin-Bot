const Discord = require('discord.js')
const Database = require("@replit/database")
const db = new Database()
const { currency } = require('../../config.json');

module.exports = {
    name: "work",
    description: "test command",

    async run (client, message, args) {
      let job = await db.get(`job_${message.author.id}`)
      const check = await db.get(`workCheck_${message.author.id}`);
      const timeout = 3600000;
      let number = message.content.substring(5)
      let argus = number.split(" ")[1]
      let currentBalance = await db.get(`wallet_${message.author.id}`)
      let worked = await db.get(`workTimes_${message.author.id}`)
      if (argus === "housewife") {
        if(job === "housewife") {
          message.channel.send("Thats already your job")
        } else {
        message.channel.send("Successfully set your job to housewife")
        await db.set(`job_${message.author.id}`, "housewife")
        }
        return
      }
      if (argus === "jobs") {
        let embed3 = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} please choose a job`)
        .setDescription(`Please choose a job`)
        .addField(`;work housewife`, `10$ an hour`)
        .addField(`;work janitor`, `10$ an hour`)
        .addField(`;work mcdonaldsmanager`, `50$ an hour, REQUIRES 20 HOURS OF WORK`)
        .addField(`;work ghostbuster`, `200$ an hour, REQUIRES 100 HOURS OF WORK, only for the dedicated`)
        .setFooter(`To view this menu again use ;work jobs`)
        message.channel.send(embed3)
        return
      }
      if (argus === "janitor") {
        if(job === "janitor") {
          message.channel.send("Thats already your job")
        } else {
        message.channel.send("Successfully set your job to janitor")
        await db.set(`job_${message.author.id}`, "janitor")
        }
        return
      }
      if (argus === "mcdonaldsmanager") {
        if(job === "mcdonaldsmanager") {
          message.channel.send("Thats already your job")
        } else {
        if(worked < 20) {
          message.channel.send("you havent worked long enough")
        } else {
          message.channel.send("Successfully set your job to mcdonalds manager")
          await db.set(`job_${message.author.id}`, "mcdonaldsmanager")
        }
        }
        return
      }
      if (argus === "ghostbuster") {
        if(job === "ghostbuster") {
          message.channel.send("Thats already your job")
        } else {
        if(worked < 100) {
          message.channel.send("you havent worked long enough")
        } else {
          message.channel.send("Successfully set your job to Ghostbuster")
          await db.set(`job_${message.author.id}`, "ghostbuster")
        }
        }
        return
      }
      if(check !== null && timeout - (Date.now() - check) > 0) {
        const ms = require("pretty-ms")
        const timeLeft = ms(timeout - (Date.now() - check))
        let embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username}, you already worked your job, dont be a workaholic`)
        .setDescription(`You have ${timeleft} left until you can work again`)
        message.channel.send(embed)
      } else {
        if (!job) {
          let embed2 = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} please choose a job`)
          .setDescription(`Please choose a job`)
          .addField(`;work housewife`, `10$ an hour`)
          .addField(`;work janitor`, `10$ an hour`)
          .addField(`;work mcdonaldsmanager`, `50$ an hour, REQUIRES 20 HOURS OF WORK`)
          .addField(`;work ghostbuster`, `200$ an hour, REQUIRES 100 HOURS OF WORK, only for the dedicated`)
          .setFooter(`To view this menu again use ;work jobs`)
          message.channel.send(embed2)
        } else {
          if (job === "housewife") {
            message.channel.send(`You cleaned some dishs and earned 10${currency}`)
            await db.set(`wallet_${message.author.id}`, currentBalance + 10)
            await db.set(`workTimes_${message.author.id}`, worked + 1)
          }
          if (job === "janitor") {
            message.channel.send(`Cleaned some spills and earned 10${currency}`)
            await db.set(`wallet_${message.author.id}`, currentBalance + 10)
            await db.set(`workTimes_${message.author.id}`, worked + 1)
          }
          if (job === "mcdonaldsmanager") {
            message.channel.send(`You dealt with karens and earned 50${currency}`)
            await db.set(`wallet_${message.author.id}`, currentBalance + 50)
            await db.set(`workTimes_${message.author.id}`, worked + 1)
          }
          if (job === "ghostbuster") {
            message.channel.send(`You busted some ghosts and earned 200${currency}`)
            await db.set(`wallet_${message.author.id}`, currentBalance + 200)
            await db.set(`workTimes_${message.author.id}`, worked + 1)
          }
        }
      }
    }
}
