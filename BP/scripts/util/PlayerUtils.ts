import { world, Player } from '@minecraft/server'
import { DIMENSION, QUEUE_LOCATION, QUEUE_VOLUME } from '../constants'

export default class PlayerUtils {

    /**
     * Returns the list of players that are waiting in the queue zone.
     */
    public static getQueuedPlayers(): Player[] {
        return DIMENSION.getPlayers({
            location: QUEUE_LOCATION,
            volume: QUEUE_VOLUME
        })
    }

    /**
     * Checks if a player is/was a particpant in a round.
     */
    public static isInRound(player: Player): boolean {
        return player.hasTag('in_round')
    }
}