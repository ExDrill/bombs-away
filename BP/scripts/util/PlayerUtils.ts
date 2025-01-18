import { world, Player, EntityInventoryComponent, EntityEquippableComponent, EquipmentSlot } from '@minecraft/server'
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
    public static getParticipants(): Player[] {
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
    public static setParticipant(player: Player, value: boolean): void {
        if (value) {
            player.addTag('in_round')
        }
        else {
            player.removeTag('in_round')
        }
    }

    /**
     * Checks if a player is/was a particpant in a round.
     * @param player The player to check.
     */
    public static isParticipant(player: Player): boolean {
        return player.hasTag('in_round')
    }

    /**
     * Clears the inventory of a player.
     * @param player The player to target.
     */
    public static clearInventory(player: Player): void {
        const inventoryComp = player.getComponent('minecraft:inventory') as EntityInventoryComponent
        const equippableComp = player.getComponent('minecraft:equippable') as EntityEquippableComponent
        const container = inventoryComp.container

        equippableComp.setEquipment(EquipmentSlot.Head)
        equippableComp.setEquipment(EquipmentSlot.Chest)
        equippableComp.setEquipment(EquipmentSlot.Legs)
        equippableComp.setEquipment(EquipmentSlot.Feet)

        container.clearAll()
    }
}