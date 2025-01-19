import { Vector3, Dimension, world } from '@minecraft/server'
import { ShopOffer, StateType, TotemInfo } from './types'
import End from './state/End'
import Lobby from './state/Lobby'
import Round from './state/Round'
import State from './state/State'

export const DIMENSION: Dimension = world.getDimension('overworld')

export const LOBBY_SPAWNPOINT: Vector3 = { x: 0, y: 7, z: 0 }
export const QUEUE_LOCATION: Vector3 = { x: 21, y: 5, z: -4 }
export const QUEUE_VOLUME: Vector3 = { x: 7, y: 6, z: 9 }

// Dyeable component doesn't exist in server 1.16.0, use equipment chests instead :/
export const EQUIPMENT_CHESTS: Vector3[] = [
    { x: 959, y: 0, z: 1000 },
    { x: 1041, y: 0, z: 1000 }
]

export const SHOP_OFFERS: ShopOffer[] = [
    {
        displayName: 'Wooden Sword',
        iconTexture: 'textures/items/wood_sword',

        item: ['minecraft:wooden_sword', 'minecraft:wooden_sword'],
        count: 1,
        cost: 5
    },
    {
        displayName: 'Bomb',
        iconTexture: 'textures/items/bomb',

        item: ['bombs_away:bomb', 'bombs_away:bomb'],
        count: 1,
        cost: 10
    },
    {
        displayName: 'Dynamite Stick',
        iconTexture: 'textures/items/dynamite_stick',

        item: ['bombs_away:dynamite_stick', 'bombs_away:dynamite_stick'],
        count: 1,
        cost: 20
    },
    {
        displayName: 'Wool',
        iconTexture: 'textures/blocks/wool_colored_white',

        item: ['minecraft:red_wool', 'minecraft:blue_wool'],
        count: 16,
        cost: 2
    }
]

export const TOTEM_INFOS: TotemInfo[] = [
    {
        name: '§m§lTotem', // Red Team
        spawnPos: { x: 967.5, y: 4, z: 1000.5 },
        deathMessage: 'Blue Team Wins!'
    },
    {
        name: '§t§lTotem', // Blue Team
        spawnPos: { x: 1033.5, y: 4, z: 1000.5 },
        deathMessage: 'Red Team Wins!'
    }
]

export const EMERALD_SPAWNERS: Vector3[] = [
    { x: 961, y: 5, z: 1000 },
    { x: 1039, y: 5, z: 1000 }
]
export const SHOPS: Vector3[] = [
    { x: 967, y: 2, z: 994 },
    { x: 1033, y: 2, z: 1006 }
]

export const TEAM_SPAWNPOINTS: Vector3[] = [
    { x: 972, y: 2, z: 1000 }, // Red Team
    { x: 1028, y: 2, z: 1000 } // Blue Team
]

export const STATE_BY_TYPE: Map<string, State> = new Map<string, State>([
    [StateType.lobby, new Lobby()],
    [StateType.round, new Round()],
    [StateType.end, new End()]
])

export const END_TICKS: number = 100 // 5 seconds
export const MAX_ROUND_TICKS: number = 24000 // 20 minutes
export const RESPAWN_TIME_TICKS: number = 100 // 5 seconds 

export const ROUND_TIME_NOTIFIERS: Map<number, string> = new Map([
    [6000, '5 minutes remaining!'],
    [2400, '2 minutes remaining!'],
    [1200, '1 minute remaining!'],
    [100, '5'],
    [80, '4'],
    [60, '3'],
    [40, '2'],
    [20, '1']
]) 



