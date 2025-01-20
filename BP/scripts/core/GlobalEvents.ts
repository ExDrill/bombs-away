import { world, PlayerBreakBlockBeforeEvent, ExplosionBeforeEvent, GameMode, PlayerSpawnAfterEvent } from '@minecraft/server'
import PlayerUtils from '../util/PlayerUtils'

export default class GlobalEvents {

    public static initialize(): void {
        world.afterEvents.playerSpawn.subscribe(this.onPlayerSpawnAfter)
        world.beforeEvents.playerBreakBlock.subscribe(this.onPlayerBreakBlockBefore)
        world.beforeEvents.explosion.subscribe(this.onExplosionBefore)
    }

    private static onPlayerSpawnAfter(event: PlayerSpawnAfterEvent): void {
        const player = event.player
        
        if (!event.initialSpawn || PlayerUtils.isParticipant(player)) {
            return
        }
        // Initialize team
        player.setProperty('bombs_away:team', 0)
    }

    private static onPlayerBreakBlockBefore(event: PlayerBreakBlockBeforeEvent): void {
        const player = event.player
        const block = event.block

        if (player.getGameMode() != GameMode.survival) return

        if (!block.typeId.includes('wool')) {
            event.cancel = true
        }        
    }

    private static onExplosionBefore(event: ExplosionBeforeEvent): void {
        const impactedBlocks = event.getImpactedBlocks()
        const woolBlocks = impactedBlocks.filter(block => block.typeId.includes('wool'))
        
        event.setImpactedBlocks(woolBlocks)
    }
}