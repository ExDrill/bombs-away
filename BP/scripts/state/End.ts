import { BlockLocationIterator, BlockVolume, GameMode, Vector3, world } from '@minecraft/server';
import { CLEANUP_VOLUME, DIMENSION, END_TICKS, LOBBY_SPAWNPOINT } from '../constants';
import { StateType } from '../types';
import PlayerUtils from '../util/PlayerUtils';
import GameManager from '../core/GameManager';
import State from './State';
import PlayerManager from '../core/PlayerManager';

export default class End extends State {
    private cleanUpIterator: BlockLocationIterator

    public override enter(): void {
        this.cleanUpIterator = CLEANUP_VOLUME.getBlockLocationIterator()

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
        // Could be more performant, but it does the job
        for (let i = 0; i < 1024; i++) {
            const next = this.cleanUpIterator.next()

            if (next.done) {
                GameManager.setState(StateType.lobby)
                break
            }
            const pos: Vector3 = next.value
            const block = DIMENSION.getBlock(pos)

            if (block.typeId.includes('wool')) {
                block.setType('minecraft:air')
            }
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