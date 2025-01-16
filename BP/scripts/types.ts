import { Vector3 } from '@minecraft/server'

export type TotemInfo = {
    name: string,
    spawnPos: Vector3,
    deathMessage: string
}

export enum StateType {
    lobby = 'lobby',
    round = 'round',
    end = 'end'
}