import { Vector3, Dimension, world } from '@minecraft/server'
import End from './core/state/End'
import Lobby from './core/state/Lobby'
import Round from './core/state/Round'
import State from './core/state/State'
import { StateType, TotemInfo } from './types'

export const LOBBY_SPAWNPOINT: Vector3 = { x: 0, y: 7, z: 0 }

export const QUEUE_LOCATION: Vector3 = { x: 21, y: 5, z: -4 }
export const QUEUE_VOLUME: Vector3 = { x: 7, y: 6, z: 9 }

export const TOTEM_INFOS: TotemInfo[] = [
    // Red Team
    {
        name: '§m§lTotem',
        spawnPos: { x: 967.5, y: 2, z: 1000.5 },
        deathMessage: 'Blue Team Wins!'
    },

    // Blue Team
    {
        name: '§t§lTotem',
        spawnPos: { x: 1033.5, y: 2, z: 1000.5 },
        deathMessage: 'Red Team Wins!'
    }
]

export const STATE_BY_TYPE: Map<string, State> = buildStateByType()

function buildStateByType(): Map<string, State> {
    const map = new Map()
    map.set(StateType.lobby, new Lobby())
    map.set(StateType.round, new Round())
    map.set(StateType.end, new End())
    return map
}

export const END_TICKS: number = 100 // 10 seconds
export const MAX_ROUND_TICKS: number = 24000 // 20 minutes

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

export const DIMENSION: Dimension = world.getDimension('overworld')

