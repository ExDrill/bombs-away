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
     * Returns the list of players that are in the round
     */
    public static getParticipants(): Player[] {
        return world.getPlayers({
            tags: ['in_round']
        })
    }

    /**
     * Returns the list of players that are in the round and are currently alive.
     */
    public static getAliveParticipants(): Player[] {
        return world.getPlayers({
            tags: ['in_round'],
            excludeTags: ['dead']
        })
    }

    /**
     * Updates whether or not a player is playing in the ongoing round.
     * 
     * @param player The player being updated.
     * @param value The updated status.
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
     * Updates whether or not a player is alive.
     * 
     * @param player The player being updated.
     * @param value The updated status.
     */
    public static setAlive(player: Player, value: boolean): void {
        if (value) {
            player.removeTag('dead')
        }
        else {
            player.addTag('dead')
        }
    }

    /**
     * Checks whether or not a player is playing in the ongoing round.
     * @param player The player being checked.
     */
    public static isParticipant(player: Player): boolean {
        return player.hasTag('in_round')
    }

    /**
     * Checks whether or not a player is alive.
     * @param player The player being checked.
     */
    public static isAlive(player: Player): boolean {
        return !player.hasTag('dead')
    }
    

    /**
     * Clears the inventory of a player
     * @param player The player being cleared.
     * @param includeArmor Whether to clear armor or not
     */
    public static clearInventory(player: Player, includeArmor: boolean = false): void {
        const inventoryComp = player.getComponent('minecraft:inventory') as EntityInventoryComponent
        const container = inventoryComp.container

        if (includeArmor) {
            const equippableComp = player.getComponent('minecraft:equippable') as EntityEquippableComponent

            equippableComp.setEquipment(EquipmentSlot.Head)
            equippableComp.setEquipment(EquipmentSlot.Chest)
            equippableComp.setEquipment(EquipmentSlot.Legs)
            equippableComp.setEquipment(EquipmentSlot.Feet)
        }
        container.clearAll()
    }
}