import {Piece} from "./Piece";
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

export class Location {

    private readonly _row: Row;
    private readonly _col: Col;

    private constructor(row: Row, col: Col) {
        this._row = row;
        this._col = col;
    }

    static from(row: Row, col: Col): Location {
        return new Location(row, col);
    }

    get row(): Row {
        return this._row;
    }

    get col(): Col {
        return this._col;
    }

    up(): Location {
        if (this.row == Row.EIGHT) {
            return this;
        }
        let rowVal = this.row.valueOf();
        let newRowKey = Row[rowVal + 1];
        let newRow = (<any>Row)[newRowKey];
        return new Location(newRow, this.col);
    }

    down(): Location {
        if (this.row == Row.ONE) {
            return this;
        }
        let rowVal = this.row.valueOf();
        let newRowKey = Row[rowVal - 1];
        let newRow = (<any>Row)[newRowKey];
        return new Location(newRow, this.col);
    }

    left(): Location {
        if (this.col == Col.A) {
            return this;
        }
        let colVal = this.col.valueOf();
        let newColKey = Col[colVal - 1];
        let newCol = (<any>Col)[newColKey];
        return new Location(this.row, newCol);
    }

    right(): Location {
        if (this.col == Col.H) {
            return this;
        }
        let colVal = this.col.valueOf();
        let newColKey = Col[colVal + 1];
        let newCol = (<any>Col)[newColKey];
        return new Location(this.row, newCol);
    }
}

export class Position {

    private readonly _location: Location;

    private _piece: Piece;

    constructor(location: Location, piece?: Piece) {
        this._location = location;
        this._piece = piece;
    }

    get location(): Location {
        return this._location;
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

export class Positions {

    private readonly _positions: Array<Position>;

    constructor() {
        this._positions = new Array<Position>();
        this.initPositions();
    }

    private initPositions(): void {
        this.addPosition(new Position(Location.from(Row.ONE, Col.A), new Rook(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.B), new Knight(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.C), new Bishop(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.D), new Queen(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.E), new King(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.F), new Bishop(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.G), new Knight(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.H), new Rook(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.A), new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.B), new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.C), new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.D), new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.E), new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.F), new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.G), new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.H), new Pawn(PlayerColor.WHITE)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.A), new Rook(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.B), new Knight(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.C), new Bishop(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.D), new Queen(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.E), new King(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.F), new Bishop(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.G), new Knight(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.H), new Rook(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.A), new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.B), new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.C), new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.D), new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.E), new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.F), new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.G), new Pawn(PlayerColor.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.H), new Pawn(PlayerColor.BLACK)));
    }

    length(): number {
        return this._positions.length;
    }

    addPosition(position: Position) {
        if (this.getPosition(position.location.row, position.location.col) == null) {
            this._positions.push(position);
        }
    }

    removePosition(position: Position) {
        let foundPos = this.getPosition(position.location.row, position.location.col);
        if (foundPos != null) {
            let index = this._positions.indexOf(foundPos);
            this._positions.splice(index, 1);
        }
    }

    getPosition(row: Row, col: Col): Position | null {
        for (let position of this._positions) {
            if (position.location.row == row && position.location.col == col) {
                return position;
            }
        }
        return null;
    }
}