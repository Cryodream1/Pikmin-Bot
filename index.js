const Discord = require('discord.js');
const client = new Discord.Client();
const Database = require("@replit/database")
const db = new Database()
const guild = new Discord.Guild()
const { default_prefix } = require('./config.json');
const { readdirSync } = require('fs');
const { join } = require('path');
const { token } = require('../token.json')
const config = require('./config.json');
const express = require("express")
const app = express()
client.config = config;

app.listen(3000, () => {
  console.log("Im ready")
})

if(config.isReplit === "No") {
	client.login(token)
} else {
	client.login(process.env.token2)
}



client.on("error", console.error);

client.on('messageReactionAdd', async (reaction, user) => {
  let id = await db.get(`ticketId_${reaction.message.guild.id}`)
  console.log(id)
  if(reaction.message.id === id && reaction.emoji.name === '🎟️') {
    reaction.user.remove(user)

    reaction.message.guild.channels.create(`ticket-${user.username}`), {
      permissionOverwrites: [
        {
          id: user.id,
          allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
        },
        {
          id: reaction.message.guild.roles.everyone,
          deny: ['VIEW_CHANNEL']
        }
      ]
    }
  }
})

app.get("/", (req, res) => {
  res.send("Never gonna give you up, never gonna let you down, never gonna run around and desert you, never gonna make you cry, never gonna say goodbye, never gonna tell a lie, to hurt you.")
})

client.on("ready", () => {
  client.user.setPresence({ activity: { name: "Just remember, the prefix is ;"}, status: "dnd"})
})

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let muterole = message.guild.roles.cache.find(role => role.name === "muted" || "Muted");

    let prefix = default_prefix

    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);

    if(!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);  

	const args = message.content.toLowerCase().slice(matchedPrefix.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${default_prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 2) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
          command.run(client, message, args);
			} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


