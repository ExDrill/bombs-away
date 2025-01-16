import { Vector3 } from '@minecraft/server'
import Vector3Utils from './Vector3Utils'

export default class Vector3d implements Vector3 {
    public readonly x: number
    public readonly y: number
    public readonly z: number

    public constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    public add(b: Vector3): Vector3d {
        const result = Vector3Utils.add(this, b)
        return Vector3d.convertFrom(result)
    }

    public subtract(b: Vector3): Vector3d {
        const result = Vector3Utils.subtract(this, b)
        return Vector3d.convertFrom(result)
    }

    public multiply(b: number | Vector3) {
        const result = Vector3Utils.multiply(this, b)
        return Vector3d.convertFrom(result)
    }

    public static convertFrom(vector: Vector3) {
        return new Vector3d(vector.x, vector.y, vector.z)
    }
}