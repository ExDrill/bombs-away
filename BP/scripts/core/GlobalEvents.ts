import { world, PlayerBreakBlockBeforeEvent, ExplosionBeforeEvent, GameMode } from '@minecraft/server'

export default class GlobalEvents {

    public static initialize(): void {
        world.beforeEvents.playerBreakBlock.subscribe(this.onPlayerBreakBlockBefore)
        world.beforeEvents.explosion.subscribe(this.onExplosionBefore)
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