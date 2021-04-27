import {Piece} from "./Piece";

export enum Row {
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT
}

export enum Col {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H
}

export class Position {

    private readonly _row: Row;
    private readonly _col: Col;

    private _piece: Piece;

    constructor(row: Row, col: Col, piece?: Piece) {
        this._row = row;
        this._col = col;
        this._piece = piece;
    }

    get row(): Row {
        return this._row;
    }

    get col(): Col {
        return this._col;
    }

    get piece(): Piece {
        return this._piece;
    }

    set piece(value: Piece) {
        this._piece = value;
    }

    hasPiece(): boolean {
        return this._piece != null;
    }
}