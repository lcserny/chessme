import {NoPiece, Piece} from "./Piece";
import {Rook} from "./Rook";
import {PlayerColor} from "./Player";
import {Knight} from "./Knight";
import {Bishop} from "./Bishop";
import {Queen} from "./Queen";
import {King} from "./King";
import {Pawn} from "./Pawn";

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
        this._piece = piece == null ? new NoPiece() : piece;
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
        return !(this._piece instanceof NoPiece);
    }
}

export class Positions {

    private readonly _positions: Array<Position>;

    constructor() {
        this._positions = new Array<Position>();
        this.initPositions();
    }

    private initPositions(): void {
        this.addPosition(new Position(Row.ONE, Col.A, new Rook(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.ONE, Col.B, new Knight(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.ONE, Col.C, new Bishop(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.ONE, Col.D, new Queen(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.ONE, Col.E, new King(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.ONE, Col.F, new Bishop(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.ONE, Col.G, new Knight(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.ONE, Col.H, new Rook(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.TWO, Col.A, new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.TWO, Col.B, new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.TWO, Col.C, new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.TWO, Col.D, new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.TWO, Col.E, new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.TWO, Col.F, new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.TWO, Col.G, new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.TWO, Col.H, new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Row.EIGHT, Col.A, new Rook(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.EIGHT, Col.B, new Knight(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.EIGHT, Col.C, new Bishop(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.EIGHT, Col.D, new Queen(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.EIGHT, Col.E, new King(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.EIGHT, Col.F, new Bishop(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.EIGHT, Col.G, new Knight(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.EIGHT, Col.H, new Rook(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.SEVEN, Col.A, new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.SEVEN, Col.B, new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.SEVEN, Col.C, new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.SEVEN, Col.D, new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.SEVEN, Col.E, new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.SEVEN, Col.F, new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.SEVEN, Col.G, new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Row.SEVEN, Col.H, new Pawn(PlayerColor.BLACK)));
    }

    length(): number {
        return this._positions.length;
    }

    addPosition(position: Position) {
        let index = this._positions.indexOf(position, 0);
        if (index == -1) {
            this._positions.push(position);
        }
    }

    removePosition(position: Position) {
        let index = this._positions.indexOf(position, 0);
        if (index > -1) {
            this._positions.splice(index, 1);
        }
    }

    getPiece(row: Row, col: Col): Piece {
        for (let position of this._positions) {
            if (position.row == row && position.col == col && position.hasPiece()) {
                return position.piece;
            }
        }
        return new NoPiece();
    }
}