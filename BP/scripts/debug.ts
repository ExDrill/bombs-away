import { system } from '@minecraft/server'
import Game from './core/Game'
import Lobby from './core/Lobby'
import Round from './core/Round'

system.afterEvents.scriptEventReceive.subscribe(event => {
    if (event.id == 'bombs_away:start_round') {
        Game.getInstance().setState(new Round())
    }

    if (event.id == 'bombs_away:end_round') {
        Game.getInstance().setState(new Lobby())
    }
})