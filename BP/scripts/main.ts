import { world } from '@minecraft/server'

import Game from './core/Game'
import './constants'
import './debug'

world.afterEvents.worldInitialize.subscribe(event => {
    new Game()

    world.gameRules.doImmediateRespawn = true
})

