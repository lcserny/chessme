import {Move} from "./Move";

export enum PlayerColor {
    WHITE = "white",
    BLACK = "black"
}

export class Player {

    private readonly _name: string;
    private readonly _color: PlayerColor;
    private readonly _moves: Array<Move>;

    constructor(name: string, color: PlayerColor) {
        this._name = name;
        this._moves = new Array<Move>();
        this._color = color;
    }

    get color(): PlayerColor {
        return this._color;
    }

    get moves(): Array<Move> {
        return this._moves;
    }

    get name(): string {
        return this._name;
    }

    addMove(move: Move): void {
        this._moves.push(move);
    }
}