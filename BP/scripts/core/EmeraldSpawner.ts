import { world, system, EntityRemoveBeforeEvent, DataDrivenEntityTriggerAfterEvent, ItemStack, EntityItemComponent } from '@minecraft/server'

export default class EmeraldSpawner {

    public static initialize(): void {
        world.afterEvents.dataDrivenEntityTrigger.subscribe(EmeraldSpawner.onSpawnEmerald, {
            entityTypes: ['bombs_away:emerald_spawner'],
            eventTypes: ['bombs_away:spawn_emerald']
        })
    }

    public static onSpawnEmerald(event: DataDrivenEntityTriggerAfterEvent): void {
        const entity = event.entity
        const dimension = entity.dimension
        
        dimension.spawnItem(new ItemStack('minecraft:emerald'), entity.location)
    }
}