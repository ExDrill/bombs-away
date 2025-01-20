import { EntityEquippableComponent, BlockInventoryComponent, GameMode, Player, EquipmentSlot, system } from '@minecraft/server'
import { RESPAWN_TIME_TICKS, TEAM_SPAWNPOINTS, EQUIPMENT_CHESTS, DIMENSION } from '../constants'
import ArrayUtils from '../util/ArrayUtils'
import ScreenDisplayUtils from '../util/ScreenDisplayUtils'
import PlayerUtils from '../util/PlayerUtils'

export default class PlayerManager {
    /**
     * A table linking player IDs to their respective respawn ticks.
     */
    private static playerToRespawnTicks: Map<string, number> = new Map<string, number>()

    /**
     * A table linking player IDs to their respective tickers.
     */
    private static playerTickers: Map<string, number> = new Map<string, number>()

    public static setup(participants: Player[]): void {
        this.assignTeams(participants)

        system.runTimeout(() => {
            for (const player of participants) {
                this.spawn(player)
        
                const ticker = system.runInterval(() => this.tick(player), 1)
                this.playerTickers.set(player.id, ticker)
            }
        }, 2)
    }

    public static destroyTickers(): void {
        this.playerTickers.clear()
    }

    public static spawn(player: Player) {
        const team = player.getProperty('bombs_away:team')
        const spawnpoint = TEAM_SPAWNPOINTS[team as number]
        
        player.teleport(spawnpoint)
        player.setGameMode(GameMode.survival)
        
        player.setSpawnPoint({
            x: spawnpoint.x,
            y: spawnpoint.y,
            z: spawnpoint.z,
            dimension: DIMENSION
        })
        player.addEffect('saturation', 99999, { amplifier: 9, showParticles: false })

        this.equipArmor(player)
    }

    public static respawn(player: Player, gameMode: GameMode): void {
        const spawnpoint = TEAM_SPAWNPOINTS[player.getProperty('bombs_away:team') as number]
        player.teleport(spawnpoint)
        player.setGameMode(gameMode)
        player.addEffect('saturation', 99999, { amplifier: 9, showParticles: false })

        PlayerUtils.setAlive(player, true)

        this.playerToRespawnTicks.delete(player.id)
    }

    public static die(player: Player): void {
        PlayerUtils.clearInventory(player, false)
        player.setGameMode(GameMode.spectator)

        PlayerUtils.setAlive(player, false)

        this.playerToRespawnTicks.set(player.id, RESPAWN_TIME_TICKS)
    }

    private static tick(player: Player) {
        // Handles respawning
        if (this.playerToRespawnTicks.has(player.id)) {
            const respawnTicks = this.playerToRespawnTicks.get(player.id)

            if (respawnTicks > 0) {
                if (respawnTicks % 20 == 0) {
                    ScreenDisplayUtils.setAdvancedTitle(`Respawning in ${respawnTicks / 20}`, { fadeInDuration: 0, stayDuration: 20, fadeOutDuration: 0 }, [player])
                }
                this.playerToRespawnTicks.set(player.id, respawnTicks - 1)
                return
            }
            this.respawn(player, GameMode.survival)
        }
    }

    public static assignTeams(players: Player[]): void {
        const shuffledPlayers = ArrayUtils.shuffle(players)
        const teamSplit = Math.floor(players.length / 2) - 1
        
        for (let i = 0; i < shuffledPlayers.length; i++) {
            const player = shuffledPlayers[i]
            const assignedTeam = i <= teamSplit ? 0 : 1
            
            player.setProperty('bombs_away:team', assignedTeam)    
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