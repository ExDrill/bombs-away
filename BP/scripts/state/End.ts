import { GameMode, world } from '@minecraft/server';
import { DIMENSION, END_TICKS, LOBBY_SPAWNPOINT } from '../constants';
import { StateType } from '../types';
import PlayerUtils from '../util/PlayerUtils';
import GameManager from '../core/GameManager';
import State from './State';
import PlayerManager from '../core/PlayerManager';

export default class End extends State {
    private ticks: number

    public override enter(): void {
        this.ticks = END_TICKS

        // Disable building and combat during this phase
        world.gameRules.pvp = false
        
        for (const player of PlayerUtils.getParticipants()) {
            if (!PlayerUtils.isAlive(player)) {
                PlayerManager.respawn(player, GameMode.adventure)
            }
            else {
                player.setGameMode(GameMode.adventure)
            }
            
            player.setSpawnPoint({
                x: LOBBY_SPAWNPOINT.x,
                y: LOBBY_SPAWNPOINT.y,
                z: LOBBY_SPAWNPOINT.z,
                dimension: DIMENSION
            })
            PlayerUtils.clearInventory(player, true)
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