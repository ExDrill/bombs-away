import { world } from '@minecraft/server'
import State from './State'
import ScreenDisplayUtils from '../../util/ScreenDisplayUtils'
import PlayerUtils from '../../util/PlayerUtils'
import GameManager from '../GameManager'
import { StateType } from '../../types'

export default class Lobby extends State {
    private queueTicks: number
    private queuing: boolean
    
    public override enter(): void {
        this.queueTicks = 0
        this.queuing = false

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

            this.queueTicks--
        }
        else {
            GameManager.setState(StateType.round)
        }
    }

    public override exit(): void {
        const queuedPlayers = PlayerUtils.getQueuedPlayers()
        this.queuing = false
        
        // Players in queue will now be participants
        for (const player of queuedPlayers) {
            PlayerUtils.setAsParticipant(player, true)
        }
    }

    public getType(): StateType {
        return StateType.lobby
    }
}