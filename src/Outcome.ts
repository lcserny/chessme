import {Position} from "./Position";

// TODO: outcome should know when in Check state and when CheckMate
export class Outcome {

    private _defeatedPosition: Position;

    hasDefeatedPosition(): boolean {
        return this.defeatedPosition != null;
    }

    get defeatedPosition(): Position {
        return this._defeatedPosition;
    }

    set defeatedPosition(value: Position) {
        this._defeatedPosition = value;
    }
}