import {Move} from "./Move";
import {Outcome} from "./Outcome";

export enum PlayerColor {
    WHITE = "white",
    BLACK = "black"
}

export class Player {

    private readonly _color: PlayerColor;

    private _moves: Array<Move> = new Array<Move>();

    constructor(color: PlayerColor) {
        this._color = color;
    }

    get color(): PlayerColor {
        return this._color;
    }

    get moves(): Array<Move> {
        return this._moves;
    }

    move(move: Move): Outcome {
        this._moves.push(move);
        // TODO: is this the right place for it?
        return new Outcome();
    }
}