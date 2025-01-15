import { system } from '@minecraft/server'
import State from './state/State'
import Lobby from './state/Lobby'

export default class Game {
    private static INSTANCE: Game

    private state: State = new Lobby()
    private oldState: State
    
    public constructor() {
        system.runInterval(this.tick.bind(this), 1)
        this.oldState = this.state

        Game.INSTANCE = this
    }
    
    // A basic state machine for handling each of the game's phases
    public tick(): void {
        if (this.state != this.oldState) {
            this.oldState.exit()
            this.state.enter()
        }
        this.state.tick()

        this.oldState = this.state
    }

    public getState(): State {
        return this.state
    }

    public setState(state: State): void {
        this.state = state
    }

    public static getInstance(): Game {
        return Game.INSTANCE
    }
}


