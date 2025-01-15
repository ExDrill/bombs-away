import { world, EntityDieAfterEvent, Player } from '@minecraft/server'
import PlayerUtils from '../util/PlayerUtils';
import State from "./State";


export default class Round extends State {

    public override enter(): void {
        world.afterEvents.entityDie.subscribe(this.playerDeath.bind(this), {
            entityTypes: ['minecraft:player']
        })
    }

    public override exit(): void {
        world.afterEvents.entityDie.unsubscribe(this.playerDeath.bind(this))
    }
    
    private playerDeath(event: EntityDieAfterEvent): void {
        const player = event.deadEntity as Player

        // Prevent spectators/non-participants from running this.
        if (!PlayerUtils.isInRound(player)) return

        

        
        
    }
}