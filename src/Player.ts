import {Move} from "./Move";

export enum Color {
    WHITE = "white",
    BLACK = "black"
}

export class Player {

    private readonly _name: string;
    private readonly _color: Color;
    private readonly _moves: Array<Move>;

    constructor(name: string, color: Color) {
        this._name = name;
        this._moves = new Array<Move>();
        this._color = color;
    }

    get color(): Color {
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