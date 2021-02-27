import * as Discord from "discord.js";
import config from "./config.json";
import { CommandHandler } from "./commands/CommandHandler"

const client = new Discord.Client();

client.on('ready', () => {
    console.log("ALIVE");
    console.log(client.user?.id)
});

client.login(config.token);

client.on('message', async message => {
    if(message.author.bot) return;

    if (!message.content.startsWith(config.prefix)) return;

    const commandHandler = new CommandHandler(client, message, config.prefix.length)
    
    commandHandler.handle()
});