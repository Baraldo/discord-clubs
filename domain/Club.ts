export class Club {
    name: string
    voiceChName: string
    textChName: string 

    constructor(clubName: string) {
        if (clubName.toLowerCase().startsWith('club-')) {
            this.name = clubName.toLowerCase()
        } else {
            this.name = 'club-' + clubName.toLowerCase()
        }
        this.voiceChName = this.toVoice(this.name)
        this.textChName = this.toText(this.name)
    }

    private toVoice(clubName: string) {
        return 'voice-' + clubName
    }

    private toText(clubName: string) {
        return 'text-' + clubName
    }
}