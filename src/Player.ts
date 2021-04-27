import {Move} from "./Move";

export enum PlayerColor {
    WHITE = "white",
    BLACK = "black"
}

export class Player {

    private readonly _name: string;
    private readonly _color: PlayerColor;
    private readonly _moves: Array<Move>;

    private _canMove: boolean;

    constructor(name: string, color: PlayerColor) {
        this._name = name;
        this._moves = new Array<Move>();
        this._color = color;
        this._canMove = color == PlayerColor.WHITE;
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

    get canMove(): boolean {
        return this._canMove;
    }

    addMove(move: Move): void {
        this._moves.push(move);
        this._canMove = !this._canMove;
    }
}