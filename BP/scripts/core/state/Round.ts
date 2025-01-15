import { world, EntityDieAfterEvent, Player, Entity, Vector3, GameMode } from '@minecraft/server'
import { DIMENSION, RED_TOTEM_SPAWN, BLUE_TOTEM_SPAWN } from '../../constants';
import PlayerUtils from '../../util/PlayerUtils';
import State from "./State";

export default class Round extends State {
    private totems: Entity[] = []
    
    private playerDiedEvent: any
    private totemDestroyedEvent: any

    public constructor() {
        super()
        this.playerDiedEvent = this.playerDied.bind(this)
        this.totemDestroyedEvent = this.totemDestroyed.bind(this)
    }

    public override enter(): void {
        // Subscribe to the events we need.
        world.afterEvents.entityDie.subscribe(this.playerDiedEvent, {
            entityTypes: ['minecraft:player']
        })
        world.afterEvents.entityDie.subscribe(this.totemDestroyedEvent, {
            entityTypes: ['bombs_away:totem']
        })
    
        this.totems[0] = this.setupTotem(0, RED_TOTEM_SPAWN)
        this.totems[1] = this.setupTotem(1, BLUE_TOTEM_SPAWN)
    }

    public override exit(): void {
        // Destroy the saved events once the round is over.
        world.afterEvents.entityDie.unsubscribe(this.playerDiedEvent)
        world.afterEvents.entityDie.unsubscribe(this.totemDestroyedEvent)
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