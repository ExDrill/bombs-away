import { world } from '@minecraft/server'

import Game from './core/Game'
import './constants'
import './debug'
import BombComponent from './component/BombComponent'

world.afterEvents.worldInitialize.subscribe(event => {
    new Game()

    world.gameRules.doImmediateRespawn = true
})

world.beforeEvents.worldInitialize.subscribe(event => {
    const registry = event.itemComponentRegistry

    registry.registerCustomComponent('bombs_away:bomb', new BombComponent())
})

