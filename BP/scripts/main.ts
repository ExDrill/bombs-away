import { world, system } from '@minecraft/server'

import Game from './core/Game'
import './constants'

world.afterEvents.worldInitialize.subscribe(event => {
    new Game()
})

// Debug commands
system.afterEvents.scriptEventReceive.subscribe(event => {
    if (event.id == 'bombs_aways:start_round') {

    }

    if (event.id == 'bombs_away:end_round') {
        
    }
})
