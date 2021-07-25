const pagination = require('discord.js-pagination');
const Discord = require('discord.js');
const { default_prefix } = require('../../config.json');

module.exports = {
    name: "help",
    description: "The help command, what do you expect?",

    async run (client, message, args){
        const memcmds = new Discord.MessageEmbed()
        .setTitle("Member commands")
        .setDescription("rps, rng, cf, ttt, rr, invite, and kill")
        .setColor("BLUE")
        .setTimestamp()

        const info = new Discord.MessageEmbed()
        .setTitle("Information")
        .setDescription("Pikmin bot is a new discord bot with various new commands")
        .setColor("BLUE")
        .setTimestamp()

        const modcmds = new Discord.MessageEmbed()
        .setTitle("Moderator commands")
        .setDescription("unmute, mute, tempmute, purge, kick, and ban")
        .setColor("BLUE")
        .setTimestamp()

        const devcmds = new Discord.MessageEmbed()
        .setTitle("Developer commands")
        .setDescription("reset, removewallet, removebank, addwallet, addtotal, removetotal, and addbank")
        .setColor("BLUE")
        .setTimestamp()

        const ecocmds = new Discord.MessageEmbed()
        .setTitle("Economy commands")
        .setDescription("balance, shop, buy, sell, inventory, gamble, gamblerps, deposit, withdraw, daily, weekly, monthly, pay, and yearly")
        .setColor("BLUE")
        .setTimestamp()

        const infocmds = new Discord.MessageEmbed()
        .setTitle("Info commands")
        .setDescription("help, ping")
        .setColor("BLUE")
        .setTimestamp()

        const pages = 
        [
          info,
          memcmds,
          ecocmds,
          infocmds,
          modcmds,
          devcmds
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '60000';

        pagination(message, pages, emojiList, timeout)
    }
}
