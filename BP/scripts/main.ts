import { world } from '@minecraft/server'

import Game from './core/Game'
import Bomb from './entity/Bomb'
import './constants'
import './debug'

world.afterEvents.worldInitialize.subscribe(event => {
    new Game()
    
    // Initialize Entities
    Bomb.subscribeToEvents()

    world.gameRules.doImmediateRespawn = true
})

