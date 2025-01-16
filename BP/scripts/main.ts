import { world } from '@minecraft/server'

import Game from './core/Game'
import './constants'
import './debug'
import ThrowableComponent from './component/ThrowableComponent'
import Vector3d from './util/Vector3d'

world.afterEvents.worldInitialize.subscribe(event => {
    new Game()

    world.gameRules.doImmediateRespawn = true
})

world.beforeEvents.worldInitialize.subscribe(event => {
    const registry = event.itemComponentRegistry

    registry.registerCustomComponent('bombs_away:throwable.bomb', new ThrowableComponent('bombs_away:bomb', new Vector3d(1, 0.5, 1)))
})

