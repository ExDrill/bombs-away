import { Vector3, Dimension, world } from '@minecraft/server'

export const LOBBY_QUEUE_LOCATION: Vector3 = { x: 21, y: 5, z: -4 }
export const LOBBY_QUEUE_VOLUME: Vector3 = { x: 7, y: 6, z: 9 }

export const DIMENSION: Dimension = world.getDimension('overworld')

