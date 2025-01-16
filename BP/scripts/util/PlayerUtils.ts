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
     * Returns the list of players that are participating in the ongoing round.
     */
    public static getParticipatingPlayers(): Player[] {
        return world.getPlayers({
            tags: ['in_round']
        })
    }

    /**
     * Sets a player's participant status.
     * 
     * @param player The player to target.
     * @param value The updated value.
     */
    public static setAsParticipant(player: Player, value: boolean): void {
        if (value) {
            player.addTag('in_round')
        }
        else {
            player.removeTag('in_round')
        }
    }

    /**
     * Checks if a player is/was a particpant in a round.
     */
    public static isParticipating(player: Player): boolean {
        return player.hasTag('in_round')
    }
}