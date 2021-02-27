import { Command } from './Command'

export class Alias extends Command {
    perform() {
        if (this.client.user?.id) {
            this.message.guild?.members.fetch(this.client.user?.id).then(GuildMember => {
                var newName = this.args.pop()
                if (newName !== undefined) {
                    GuildMember.setNickname(newName)
                }
            })
        }
    }
};