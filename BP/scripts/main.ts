import { world } from '@minecraft/server'

import Game from './core/Game'
import './constants'

world.afterEvents.worldInitialize.subscribe(event => {
    new Game()
})
