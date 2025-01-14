import { Player } from '@minecraft/server'
import { DIMENSION, LOBBY_QUEUE_VOLUME, LOBBY_QUEUE_LOCATION } from '../constants'
import ScreenDisplayUtils from '../util/ScreenDisplayUtils'

export default class Lobby {
    private countdownTicks: number = 0
    private countdownActive: boolean = false
    
    public tick(): void {
        const queuedPlayers = this.getQueuedPlayers()

        if (queuedPlayers.length < 2) {
            ScreenDisplayUtils.setActionBar('2 players are required to start a round!')
            
            // Cancel the countdown
            if (this.countdownActive) {
                this.countdownActive = false
                this.countdownTicks = 0
            }
            return
        }

        if (!this.countdownActive) {
            this.countdownTicks = 100
            this.countdownActive = true
        }
        if (this.countdownTicks > 0) {
            if (this.countdownTicks % 20 == 0) {
                ScreenDisplayUtils.setActionBar(`Starting in ${this.countdownTicks / 20}`, queuedPlayers)
            }
            this.countdownTicks -= 1
        }
        if (this.countdownTicks == 0) {
            // TODO: start
            this.countdownActive = false
        }
    }

    public getQueuedPlayers(): Player[] {
        return DIMENSION.getPlayers({
            location: LOBBY_QUEUE_LOCATION,
            volume: LOBBY_QUEUE_VOLUME
        })
    }
}