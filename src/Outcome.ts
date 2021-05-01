import {Position} from "./Position";

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

export class NotAllowed extends Outcome {

}