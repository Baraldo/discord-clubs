import { Command } from './Command'
import { Club } from '../domain/Club'
import { Message } from 'discord.js'
import { Client } from "discord.js"

export class ClubCommand extends Command {
    club: Club | null
    subCommand: string

    constructor(client: Client, message: Message, args: string[]) {
        super(client, message, args)
        this.subCommand = args.shift()!.toUpperCase()   
        
        if (args == undefined) {
            this.club = null
        } else{
            this.club = new Club(args.pop()!)
        }
        
    }

    private checkIfManager(): boolean {
        return this.message.member?.roles.cache.some(r => r.name === "club-manager")!
    }

    private checkIfExists(): boolean {
        if (this.message.guild?.roles.cache.find(c => c.name.toLowerCase() === this.club!.name)) {
            return true
        }
        if (this.message.guild?.channels.cache.find(c => c.name.toLowerCase() === this.club!.name)) {
            return true
        }
        return false
    }

    private delete() {
        if (this.checkIfManager() == false) {return}
        this.message.guild?.roles.cache.find(c => c.name.toLowerCase() === this.club!.name)?.delete()
        this.message.guild?.channels.cache.find(c => c.name.toLowerCase() === this.club!.name)?.delete()
        this.message.guild?.channels.cache.find(c => c.name.toLowerCase() === this.club!.voiceChName)?.delete()
        this.message.guild?.channels.cache.find(c => c.name.toLowerCase() === this.club!.textChName)?.delete()
    }

    private create() {
        if (this.checkIfManager() == false) {return}
        if (!this.checkIfExists()) {
            this.message.guild?.roles.create({
                data: {
                    name: this.club!.name
                }
            }).then(roleResult => {
                this.message.guild?.channels.create(this.club!.name, {
                    type: 'category',
                    permissionOverwrites: [
                        {
                          id: this.message.guild.id,
                          deny: 'VIEW_CHANNEL'
                        },
                        {
                          id: roleResult.id,
                          allow: 'VIEW_CHANNEL'
                        }
                      ]
                }).then(categoryResult => {
                    this.message.guild?.channels.create(this.club!.voiceChName, {
                        type: 'voice',
                        parent: categoryResult.id
                    })

                    this.message.guild?.channels.create(this.club!.textChName, {
                        type: 'text',
                        parent: categoryResult.id
                    })
                }).then(channelsResult => {
                    this.message.member?.roles.add(roleResult)
                }).then(roleGranted => {
                    this.message.channel.send('Club ' + this.club!.name + ' created!')
                })
            })
        }
    }

    private setUp() {
        if (this.message.guild?.roles.cache.some(r => r.name === "club-manager")! == false) {
            this.message.guild?.roles.create({
                data: {
                    name: "club-manager"
                }
            }).then(roleResult => {
                this.message.member?.roles.add(roleResult)
            })
        }
    }

    private join() {
        var clubRolePermissions = this.message.guild?.roles.cache.find(role => role.name === this.club!.name)?.permissions.serialize()
        console.log(clubRolePermissions)
    }

    perform() {
        switch(this.subCommand) { 
            case 'CREATE': {
                this.create()
                break;
            }
            case 'DELETE': {
                this.delete()
                break;
            }
            case 'SETUP': {
                this.setUp()
                break;
            }
        }
    }
};