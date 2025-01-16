import { Vector3 } from '@minecraft/server'

export default class Vector3Utils {

    public static add(a: Vector3, b: Vector3): Vector3 {
        return {
            x: a.x + b.x,
            y: a.y + b.y,
            z: a.z + b.z
        }
    }

    public static subtract(a: Vector3, b: Vector3): Vector3 {
        return {
            x: a.x - b.x,
            y: a.y - b.y,
            z: a.z - b.z
        }
    }

    public static multiply(a: Vector3, b: Vector3 | number): Vector3 {
        if (typeof b == 'number') {
            return {
                x: a.x * b,
                y: a.y * b,
                z: a.z * b
            }
        }
        return {
            x: a.x * b.x,
            y: a.y * b.y,
            z: a.z * b.z
        }
    }
}