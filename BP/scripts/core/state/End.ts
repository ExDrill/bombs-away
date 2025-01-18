import { GameMode, world } from '@minecraft/server';
import { END_TICKS, LOBBY_SPAWNPOINT } from '../../constants';
import { StateType } from '../../types';
import PlayerUtils from '../../util/PlayerUtils';
import GameManager from '../GameManager';
import State from './State';

export default class End extends State {
    private ticks: number

    public override enter(): void {
        this.ticks = END_TICKS

        // Disable building and combat during this phase
        world.gameRules.pvp = false
        
        for (const player of PlayerUtils.getParticipants()) {
            player.setGameMode(GameMode.adventure)
        }
    }

    public override tick(): void {
        if (this.ticks > 0) {
            this.ticks--
        }

        if (this.ticks == 0) {
            GameManager.setState(StateType.lobby)
        }
    }

    public override exit(): void {
        for (const participant of PlayerUtils.getParticipants()) {
            PlayerUtils.setParticipant(participant, false)
            participant.teleport(LOBBY_SPAWNPOINT)
        }
    }

    public getType(): StateType {
        return StateType.end
    }
}