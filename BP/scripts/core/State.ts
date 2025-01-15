import Game from './Game'

export default abstract class State {
    public enter(): void {}

    public tick(): void {}

    public exit(): void {}
}