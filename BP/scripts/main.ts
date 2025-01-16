import { world } from '@minecraft/server'

import GameManager from './core/GameManager'
import ThrowableComponent from './component/ThrowableComponent'
import Vector3d from './util/Vector3d'

import './debug'

world.afterEvents.worldInitialize.subscribe(event => {
    GameManager.initialize()
    world.gameRules.doImmediateRespawn = true
})

world.beforeEvents.worldInitialize.subscribe(event => {
    const registry = event.itemComponentRegistry

    registry.registerCustomComponent('bombs_away:throwable.bomb', new ThrowableComponent('bombs_away:bomb', new Vector3d(1, 0.5, 1)))
})

