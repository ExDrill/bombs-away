import { Vector3, Dimension, world } from '@minecraft/server'
import { TotemInfo } from './types'

export const QUEUE_LOCATION: Vector3 = { x: 21, y: 5, z: -4 }
export const QUEUE_VOLUME: Vector3 = { x: 7, y: 6, z: 9 }

export const TOTEM_INFOS: TotemInfo[] = [
    // Red Team
    {
        name: '§m§lTotem',
        spawnPos: { x: 967.5, y: 2, z: 1000.5 }
    },

    // Blue Team
    {
        name: '§t§lTotem',
        spawnPos: { x: 1033.5, y: 2, z: 1000.5 }
    }
]

export const MAX_ROUND_TICKS: number = 24000 // 20 minutes

/**
 * A lookup table for round time title notifiers.
 */
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

/**
 * The default overworld dimension
 */
export const DIMENSION: Dimension = world.getDimension('overworld')

