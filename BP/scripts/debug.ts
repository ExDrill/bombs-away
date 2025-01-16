import { system } from '@minecraft/server'
import GameManager from './core/GameManager'
import { StateType } from './types'

system.afterEvents.scriptEventReceive.subscribe(event => {
    if (event.id == 'bombs_away:start_round' && GameManager.isOnState(StateType.lobby)) {
        GameManager.setState(StateType.round)
    }

    if (event.id == 'bombs_away:end_round' && GameManager.isOnState(StateType.round)) {
        GameManager.setState(StateType.end)
    }
})