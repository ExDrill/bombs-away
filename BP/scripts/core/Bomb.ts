import { world, DataDrivenEntityTriggerAfterEvent, EntityTameableComponent } from '@minecraft/server'

export default class Bomb {

    public static initialize(): void {
        world.afterEvents.dataDrivenEntityTrigger.subscribe(this.onExplode, {
            entityTypes: ['bombs_away:bomb'],
            eventTypes: ['bombs_away:explode']
        })
    }

    public static onExplode(event: DataDrivenEntityTriggerAfterEvent): void {
        const bomb = event.entity
        const tameableComp = bomb.getComponent('minecraft:tameable') as EntityTameableComponent
        const dimension = bomb.dimension

        dimension.createExplosion(bomb.location, 2, {
            source: tameableComp.entity
        })
        bomb.remove()
    }
}