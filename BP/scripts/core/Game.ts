import { system } from '@minecraft/server'
import { State } from '../types'
import Lobby from './Lobby'

export default class Game {
    private static INSTANCE: Game

    private state: State = State.Lobby
    private lobbyManager: Lobby = new Lobby()
    
    public constructor() {
        system.runInterval(this.tick.bind(this), 1)

        Game.INSTANCE = this
    }

    public tick(): void {
        if (this.state == State.Lobby) {
            this.lobbyManager.tick()
        }
    }

    public getState(): State {
        return this.state
    }

    public setState(state: State): void {
        this.state = state
    }

    public getLobbyManager(): Lobby {
        return this.lobbyManager
    }

    public static getInstance(): Game {
        return Game.INSTANCE
    }
}


