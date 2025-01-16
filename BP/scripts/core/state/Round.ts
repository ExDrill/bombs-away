import { world, EntityDieAfterEvent, PlayerBreakBlockBeforeEvent, ExplosionBeforeEvent, Player, Entity, GameMode } from '@minecraft/server'
import { DIMENSION, TOTEM_INFOS, MAX_ROUND_TICKS, ROUND_TIME_NOTIFIERS } from '../../constants';
import { StateType } from '../../types';
import PlayerUtils from '../../util/PlayerUtils';
import ScreenDisplayUtils from '../../util/ScreenDisplayUtils'
import GameManager from '../GameManager';
import State from './State';

export default class Round extends State {
    private roundTicks: number

    // Event Functions
    private readonly playerDieAfter: any = this.onPlayerDieAfter.bind(this)
    private readonly totemDieAfter: any = this.onTotemDieAfter.bind(this)
    private readonly playerBreakBlockBefore: any = this.onPlayerBreakBlockBefore.bind(this)
    private readonly explosionBefore: any = this.onExplosionBefore.bind(this)

    public override enter(): void {
        this.roundTicks = MAX_ROUND_TICKS

        const participants = PlayerUtils.getParticipatingPlayers()

        // Gamerules
        world.gameRules.pvp = true

        // Subscribe to the events we need.
        world.afterEvents.entityDie.subscribe(this.playerDieAfter, {
            entities: participants
        })
        world.afterEvents.entityDie.subscribe(this.totemDieAfter, {
            entityTypes: ['bombs_away:totem']
        })
        world.beforeEvents.playerBreakBlock.subscribe(this.playerBreakBlockBefore)
        world.beforeEvents.explosion.subscribe(this.explosionBefore)

        // Totem setup
        for (let i = 0; i <= 1; i++) {
            const totem = DIMENSION.spawnEntity('bombs_away:totem', TOTEM_INFOS[i].spawnPos)
            totem.nameTag = TOTEM_INFOS[i].name
            totem.setProperty('bombs_away:team', i)
        }

        // Player setup
        for (const participant of participants) {
            participant.setGameMode(GameMode.survival)
        }

        // The round has begun. :)
        ScreenDisplayUtils.setTitle('Round Start!', participants)
    }

    public override tick(): void {
        if (this.roundTicks > 0) {
            this.roundTicks--
        }
        else {
            ScreenDisplayUtils.setTitleWithSubtitle("Round End!", 'Draw!', PlayerUtils.getParticipatingPlayers())
            GameManager.setState(StateType.end)
        }

        if (ROUND_TIME_NOTIFIERS.has(this.roundTicks)) {
            const notifier = ROUND_TIME_NOTIFIERS.get(this.roundTicks)

            ScreenDisplayUtils.setTitle(notifier, PlayerUtils.getParticipatingPlayers())
        }
    }

    public override exit(): void {
        // Destroy the saved events once the round is over.
        world.afterEvents.entityDie.unsubscribe(this.playerDieAfter)
        world.afterEvents.entityDie.unsubscribe(this.totemDieAfter)
        world.beforeEvents.playerBreakBlock.unsubscribe(this.playerBreakBlockBefore)
        world.beforeEvents.explosion.unsubscribe(this.explosionBefore)

        // Clean up any remaining totems
        for (const totem of DIMENSION.getEntities({ type: 'bombs_away:totem'})) {
            totem.remove()
        }
    }
    
    private onPlayerDieAfter(event: EntityDieAfterEvent): void {
        const player = event.deadEntity as Player

        player.setGameMode(GameMode.spectator)

        // TODO: add respawn countdown
    }

    private onTotemDieAfter(event: EntityDieAfterEvent): void {
        const entity = event.deadEntity
        const team = entity.getProperty('bombs_away:team') as number

        ScreenDisplayUtils.setTitleWithSubtitle('Round End!', TOTEM_INFOS[team].deathMessage, PlayerUtils.getParticipatingPlayers())
        GameManager.setState(StateType.end)
    }

    private onPlayerBreakBlockBefore(event: PlayerBreakBlockBeforeEvent) {
        const block = event.block

        // Only wool can be broken
        if (!block.typeId.includes('wool')) {
            event.cancel = true
        }
    }

    private onExplosionBefore(event: ExplosionBeforeEvent) {
        const impactedBlocks = event.getImpactedBlocks()
        const woolBlocks = impactedBlocks.filter(block => block.typeId.includes('wool'))
        
        // Only wool can be broken
        event.setImpactedBlocks(woolBlocks)
    }

    public getType(): StateType {
        return StateType.round
    }
}