import { world } from '@minecraft/server'

import GameManager from './core/GameManager'
import GlobalEvents from './core/GlobalEvents'
import ThrowableComponent from './component/ThrowableComponent'
import Vector3d from './util/Vector3d'
import Shop from './core/Shop'
import EmeraldSpawner from './core/EmeraldSpawner'
import DynamiteStick from './core/DynamiteStick'
import Bomb from './core/Bomb'

import './debug'

world.afterEvents.worldInitialize.subscribe(() => {
    GameManager.initialize()
    GlobalEvents.initialize()

    // Entities
    Shop.initialize()
    EmeraldSpawner.initialize()
    Bomb.initialize()
    DynamiteStick.initialize()
    
    world.gameRules.doImmediateRespawn = true
    world.gameRules.doTileDrops = false
})

world.beforeEvents.worldInitialize.subscribe(event => {
    const registry = event.itemComponentRegistry

    registry.registerCustomComponent('bombs_away:throwable.bomb', new ThrowableComponent('bombs_away:bomb', new Vector3d(1, 0.5, 1)))
    registry.registerCustomComponent('bombs_away:throwable.dynamite_stick', new ThrowableComponent('bombs_away:dynamite_stick', new Vector3d(2.5, 1.5, 2.5)))
})