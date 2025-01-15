import { world, EntityDieAfterEvent, Player, Entity, Vector3, GameMode } from '@minecraft/server'
import { DIMENSION, RED_TOTEM_SPAWN, BLUE_TOTEM_SPAWN } from '../constants';
import PlayerUtils from '../util/PlayerUtils';
import State from "./State";

export default class Round extends State {
    private totems: Entity[] = []

    public override enter(): void {
        // Subscribe to the events we need.
        world.afterEvents.entityDie.subscribe(this.playerDied.bind(this), {
            entityTypes: ['minecraft:player']
        })
        world.afterEvents.entityDie.subscribe(this.totemDestroyed.bind(this), {
            entityTypes: ['bombs_away:totem']
        })
    
        this.totems[0] = this.setupTotem(0, RED_TOTEM_SPAWN)
        this.totems[1] = this.setupTotem(1, BLUE_TOTEM_SPAWN)
    }

    public override exit(): void {
        // Destroy the events once the round is over.
        world.afterEvents.entityDie.unsubscribe(this.playerDied.bind(this))
        world.afterEvents.entityDie.unsubscribe(this.totemDestroyed.bind(this))
    }
    
    private playerDied(event: EntityDieAfterEvent): void {
        const player = event.deadEntity as Player

        // Prevent spectators/non-participants from running this.
        if (!PlayerUtils.isParticipating(player)) return

        player.setGameMode(GameMode.spectator)

        // TODO: add respawn countdown
    }

    private totemDestroyed(event: EntityDieAfterEvent): void {
        const entity = event.deadEntity
        const team = entity.getProperty('bombs_away:team') as number

        if (this.totems[team]) {
            this.totems[team] = undefined
        }
    }

    private setupTotem(team: number, pos: Vector3): Entity {
        const totem = DIMENSION.spawnEntity('bombs_away:totem', pos)
        totem.setProperty('bombs_away:team', team)
        return totem
    }
}