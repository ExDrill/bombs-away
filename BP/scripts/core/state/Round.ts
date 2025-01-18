import { world, EntityDieAfterEvent, PlayerBreakBlockBeforeEvent, ExplosionBeforeEvent, Player, Entity, GameMode } from '@minecraft/server'
import { DIMENSION, TOTEM_INFOS, MAX_ROUND_TICKS, ROUND_TIME_NOTIFIERS } from '../../constants';
import { StateType } from '../../types';
import PlayerUtils from '../../util/PlayerUtils';
import ScreenDisplayUtils from '../../util/ScreenDisplayUtils'
import GameManager from '../GameManager';
import PlayerManager from '../PlayerManager';
import State from './State';

export default class Round extends State {
    private roundTicks: number

    // Event Functions
    private readonly playerDieAfter: any = this.onPlayerDieAfter.bind(this)
    private readonly totemDieAfter: any = this.onTotemDieAfter.bind(this)

    public override enter(): void {
        this.roundTicks = MAX_ROUND_TICKS

        const participants = PlayerUtils.getParticipants()

        // Gamerules
        world.gameRules.pvp = true

        // Subscribe to the events we need.
        world.afterEvents.entityDie.subscribe(this.playerDieAfter, {
            entities: participants
        })
        world.afterEvents.entityDie.subscribe(this.totemDieAfter, {
            entityTypes: ['bombs_away:totem']
        })

        // Totem setup
        for (let i = 0; i <= 1; i++) {
            const totem = DIMENSION.spawnEntity('bombs_away:totem', TOTEM_INFOS[i].spawnPos)
            totem.nameTag = TOTEM_INFOS[i].name
            totem.setProperty('bombs_away:team', i)
        }

        // Player setup
        PlayerManager.setup(participants)

        // The round has started :)
        ScreenDisplayUtils.setTitle('Round Start!', participants)
    }

    public override tick(): void {
        if (this.roundTicks > 0) {
            this.roundTicks--
        }
        else {
            ScreenDisplayUtils.setTitleWithSubtitle("Round End!", 'Draw!', PlayerUtils.getParticipants())
            GameManager.setState(StateType.end)
        }

        if (ROUND_TIME_NOTIFIERS.has(this.roundTicks)) {
            const notifier = ROUND_TIME_NOTIFIERS.get(this.roundTicks)

            ScreenDisplayUtils.setTitle(notifier, PlayerUtils.getParticipants())
        }
    }

    public override exit(): void {
        // Destroy the saved events once the round is over.
        world.afterEvents.entityDie.unsubscribe(this.playerDieAfter)
        world.afterEvents.entityDie.unsubscribe(this.totemDieAfter)

        // Clean up any remaining totems
        for (const totem of DIMENSION.getEntities({ type: 'bombs_away:totem'})) {
            totem.remove()
        }
    }
    
    private onPlayerDieAfter(event: EntityDieAfterEvent): void {
        PlayerManager.queueRespawn(event.deadEntity as Player)
    }

    private onTotemDieAfter(event: EntityDieAfterEvent): void {
        const entity = event.deadEntity
        const team = entity.getProperty('bombs_away:team') as number

        ScreenDisplayUtils.setTitleWithSubtitle('Round End!', TOTEM_INFOS[team].deathMessage, PlayerUtils.getParticipants())
        GameManager.setState(StateType.end)
    }

    public getType(): StateType {
        return StateType.round
    }
}