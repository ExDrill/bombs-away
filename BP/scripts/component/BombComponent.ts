import { EntityTameableComponent, ItemCustomComponent, ItemUseAfterEvent, Player } from '@minecraft/server';
import Vector3d from '../util/Vector3d';

export default class BombComponent implements ItemCustomComponent {

    public constructor() {
        this.onUse = this.onUse.bind(this)
    }


    public onUse(event: ItemUseAfterEvent): void {
        const user = event.source
        this.spawnBomb(user)
    }

    private spawnBomb(user: Player): void {
        const dimension = user.dimension

        const viewDir = Vector3d.convertFrom(user.getViewDirection())
        const velocity = viewDir.multiply(new Vector3d(1, 0.5, 1))

        const spawnPos = viewDir.multiply(new Vector3d(0.5, 0.5, 0.5)).add(user.getHeadLocation())
        
        const bomb = dimension.spawnEntity('bombs_away:bomb', spawnPos)

        bomb.applyImpulse(velocity)
        
        const tameableComp = bomb.getComponent('minecraft:tameable') as EntityTameableComponent
        tameableComp.tame(user)
    }
}