import { EntityTameableComponent, ItemCustomComponent, ItemUseAfterEvent, Player } from '@minecraft/server';
import Vector3d from '../util/Vector3d';

// ogre

export default class ThrowableComponent implements ItemCustomComponent {
    private readonly entityId: string
    private readonly force: Vector3d

    public constructor(entityId: string, force: Vector3d) {
        this.entityId = entityId
        this.force = force

        this.onUse = this.onUse.bind(this)
    }


    public onUse(event: ItemUseAfterEvent): void {
        const user = event.source
        this.spawnBomb(user)
    }

    private spawnBomb(user: Player): void {
        const dimension = user.dimension

        const viewDir = Vector3d.convertFrom(user.getViewDirection())
        const velocity = viewDir.multiply(this.force)

        const spawnPos = viewDir.multiply(new Vector3d(0.5, 0.5, 0.5)).add(user.getHeadLocation())
        
        const bomb = dimension.spawnEntity(this.entityId, spawnPos)

        bomb.applyImpulse(velocity)
        
        const tameableComp = bomb.getComponent('minecraft:tameable') as EntityTameableComponent
        tameableComp.tame(user)
    }
}