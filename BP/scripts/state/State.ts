import { StateType } from "../types";

export default abstract class State {
    public enter(): void {}

    public tick(): void {}

    public exit(): void {}

    public abstract getType(): StateType
}