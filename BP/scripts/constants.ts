import { Vector3, Dimension, world } from '@minecraft/server'

export const QUEUE_LOCATION: Vector3 = { x: 21, y: 5, z: -4 }
export const QUEUE_VOLUME: Vector3 = { x: 7, y: 6, z: 9 }

export const RED_TOTEM_SPAWN: Vector3 = { x: 967.5, y: 2, z: 1000.5 }
export const BLUE_TOTEM_SPAWN: Vector3 = { x: 1033.5, y: 2, z: 1000.5 }

export const DIMENSION: Dimension = world.getDimension('overworld')

