import { system } from '@minecraft/server'
import State from './state/State'
import { STATE_BY_TYPE } from '../constants'
import { StateType } from '../types'

export default class GameManager {
    private static state: State
    private static oldState: State
    
    public static initialize(): void {
        this.state = STATE_BY_TYPE.get(StateType.lobby)
        this.oldState = STATE_BY_TYPE.get(StateType.lobby)
        this.state.enter()

        // The tick/update function
        system.runInterval(this.tick.bind(this), 1)
    }
    
    // A basic state machine for handling game phases
    private static tick(): void {
        if (this.oldState != this.state) {
            this.oldState.exit()
            this.state.enter()
        }
        this.oldState = this.state
        
        this.state.tick()
    }

    public static getState(): State {
        return this.state
    }

    public static setState(state: StateType): void {
        this.state = STATE_BY_TYPE.get(state)
    }

    public static isOnState(state: StateType): boolean {
        return this.state == STATE_BY_TYPE.get(state)
    }
}


