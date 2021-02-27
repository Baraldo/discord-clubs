import { PgRepository } from '../repository/PgRepository'
import { Message } from 'discord.js'
import { Client } from "discord.js"


export abstract class Command {
    repository: PgRepository
    message: Message
    client: Client
    args: string[]

    constructor(client: Client, message: Message, args: string[]) {
        this.repository = new PgRepository();
        this.message = message
        this.client = client
        this.args = args
    };

    abstract perform(): void
};