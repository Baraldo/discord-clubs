import { Message } from 'discord.js'
import { Client } from 'discord.js'
import { Alias } from './Alias'
import { ClubCommand } from './ClubCommands'


export class CommandHandler {
    client: Client
    message: Message
    args: string[]
    command?: string

    constructor(client: Client, message: Message, prefix: number) {
        this.client = client
        this.message = message;
        this.args = message.content.slice(prefix).trim().split(/ +/g);
        this.command = this.args.shift()?.toUpperCase();
    };

    private validCommand(value: string): value is keyof typeof commandDict {
        return value in commandDict;
    }

    public handle() {
        if (this.command) {
            if (this.validCommand(this.command)) {
                const command = this.command as keyof typeof commandDict
                new commandDict[command](this.client, this.message, this.args).perform()
            }
        }
    }
};


const commandDict = {
    "ALIAS": Alias,
    "CLUB": ClubCommand
};