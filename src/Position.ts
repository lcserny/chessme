import {Piece} from "./Piece";

export class Position {

    private readonly _row: string;
    private readonly _col: string;

    private _piece: Piece;

    constructor(row: string, col: string, piece?: Piece) {
        this._row = row;
        this._col = col;
        this._piece = piece;
    }

    get row(): string {
        return this._row;
    }

    get col(): string {
        return this._col;
    }

    get piece(): Piece {
        return this._piece;
    }

    set piece(value: Piece) {
        this._piece = value;
    }
}