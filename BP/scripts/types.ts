import { Vector3 } from '@minecraft/server'

export type TotemInfo = {
    name: string,
    spawnPos: Vector3,
    deathMessage: string
}

export type ShopOffer =  {
    displayName: string,
    iconTexture: string,
    item: string | string[],
    count: number,
    cost: number
}

export enum StateType {
    lobby = 'lobby',
    round = 'round',
    end = 'end'
}