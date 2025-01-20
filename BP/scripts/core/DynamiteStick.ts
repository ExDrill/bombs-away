import { world, DataDrivenEntityTriggerAfterEvent, EntityTameableComponent } from '@minecraft/server'

export default class DynamiteStick {

    public static initialize(): void {
        world.afterEvents.dataDrivenEntityTrigger.subscribe(this.onExplode, {
            entityTypes: ['bombs_away:dynamite_stick'],
            eventTypes: ['bombs_away:explode']
        })
    }

    public static onExplode(event: DataDrivenEntityTriggerAfterEvent): void {
        const dynamiteStick = event.entity
        const tameableComp = dynamiteStick.getComponent('minecraft:tameable') as EntityTameableComponent
        const dimension = dynamiteStick.dimension

        dimension.createExplosion(dynamiteStick.location, 4, {
            source: tameableComp.entity
        })
        dynamiteStick.remove()
    }
}