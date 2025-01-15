import { world } from '@minecraft/server'
import State from './State'
import ScreenDisplayUtils from '../../util/ScreenDisplayUtils'
import PlayerUtils from '../../util/PlayerUtils'
import Round from './Round'
import Game from '../Game'

export default class Lobby extends State {
    private queueTicks: number = 0
    private queuing: boolean = false
    
    public override enter(): void {
        world.gameRules.pvp = false
    }

    public override tick(): void {
        const queuedPlayers = PlayerUtils.getQueuedPlayers()

        if (queuedPlayers.length < 2) {
            ScreenDisplayUtils.setActionBar('2 players are required to start a round!')
            
            // Cancel the queue
            if (this.queuing) {
                this.queuing = false
                this.queueTicks = 0
            }
            return
        }

        if (!this.queuing) {
            this.queueTicks = 100
            this.queuing = true
        }
        if (this.queueTicks > 0) {
            if (this.queueTicks % 20 == 0) {
                ScreenDisplayUtils.setActionBar(`Starting in ${this.queueTicks / 20}`, queuedPlayers)
            }
            this.queueTicks -= 1
        }
        if (this.queueTicks == 0) {
            Game.getInstance().setState(new Round())
            this.queuing = false
        }
    }
}