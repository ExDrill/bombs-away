import { world, EntityTameableComponent, DataDrivenEntityTriggerAfterEvent } from '@minecraft/server'

export default class Bomb {

    public static subscribeToEvents(): void {
        world.afterEvents.dataDrivenEntityTrigger.subscribe(Bomb.explode, {
            eventTypes: ['bombs_away:explode']
        })
    }

    private static explode(event: DataDrivenEntityTriggerAfterEvent) {
        const bomb = event.entity
        const tameableComponent = bomb.getComponent('minecraft:tameable') as EntityTameableComponent
        const dimension = bomb.dimension
        
        dimension.createExplosion(bomb.location, 2, {
            source: tameableComponent.tamedToPlayer
        })
        bomb.remove()
    }
}