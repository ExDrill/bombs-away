import { EntityEquippableComponent, BlockInventoryComponent, GameMode, Player, EquipmentSlot, system } from '@minecraft/server'
import { RESPAWN_TIME_TICKS, TEAM_SPAWNPOINTS, EQUIPMENT_CHESTS, DIMENSION } from '../constants'
import ArrayUtils from '../util/ArrayUtils'
import ScreenDisplayUtils from '../util/ScreenDisplayUtils'
import PlayerUtils from '../util/PlayerUtils'

export default class PlayerManager {

    public static setup(participants: Player[]): void {
        this.assignTeams(participants)

        for (const player of participants) {
            this.onSpawn(player)
        }
    }

    public static onSpawn(player: Player) {
        const team = player.getProperty('bombs_away:team')
        const spawnpoint = TEAM_SPAWNPOINTS[team as number]
        
        player.setGameMode(GameMode.survival)
        player.teleport(spawnpoint)

        player.setSpawnPoint({
            x: spawnpoint.x,
            y: spawnpoint.y,
            z: spawnpoint.z,
            dimension: DIMENSION
        })

        this.equipArmor(player)

        
    }

    public static onDie(player: Player): void {
        PlayerUtils.clearInventory(player)
        player.setGameMode(GameMode.spectator)

        ScreenDisplayUtils.setActionBar('Respawning soon...', [player])

        // Somewhat jank respawn countdown, but it does its job.
        for (let i = Math.floor(RESPAWN_TIME_TICKS / 20); i > 0; i--) {
            system.runTimeout(() => ScreenDisplayUtils.setTitle(`Respawning in ${i}`), RESPAWN_TIME_TICKS - (i * 20))
        }
        system.runTimeout(() => {
            this.onSpawn(player)
            ScreenDisplayUtils.setTitle('') // Clear the title
        }, RESPAWN_TIME_TICKS)
    }

    private static assignTeams(players: Player[]): void {
        const shuffledPlayers = ArrayUtils.shuffle(players)
        const teamSplit = Math.floor(players.length / 2) - 1
        
        for (let i = 0; i < shuffledPlayers.length; i++) {
            const player = shuffledPlayers[i]
            player.setProperty('bombs_away:team', i <= teamSplit ? 0 : 1)    
        }
    }

    private static equipArmor(player: Player): void {
        const equippableComp = player.getComponent('minecraft:equippable') as EntityEquippableComponent
        const team = player.getProperty('bombs_away:team') as number
        
        const block = DIMENSION.getBlock(EQUIPMENT_CHESTS[team])
        const inventoryComp = block.getComponent('minecraft:inventory') as BlockInventoryComponent
        const container = inventoryComp.container
        
        equippableComp.setEquipment(EquipmentSlot.Head, container.getItem(0))
        equippableComp.setEquipment(EquipmentSlot.Chest, container.getItem(1))
        equippableComp.setEquipment(EquipmentSlot.Legs, container.getItem(2))
        equippableComp.setEquipment(EquipmentSlot.Feet, container.getItem(3))
    }
}