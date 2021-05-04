import {Piece} from "./Piece";
import {Rook} from "./Rook";
import {Color} from "./Player";
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

    // FIXME
    private static whiteBoardLocations: Array<Location> = [
        Location.from(Row.ONE, Col.B),
        Location.from(Row.ONE, Col.D),
        Location.from(Row.ONE, Col.F),
        Location.from(Row.ONE, Col.H),
        Location.from(Row.TWO, Col.A),
        Location.from(Row.TWO, Col.C),
        Location.from(Row.TWO, Col.E),
        Location.from(Row.TWO, Col.G),
        Location.from(Row.THREE, Col.B),
        Location.from(Row.THREE, Col.D),
        Location.from(Row.THREE, Col.F),
        Location.from(Row.THREE, Col.H),
        Location.from(Row.FOUR, Col.A),
        Location.from(Row.FOUR, Col.C),
        Location.from(Row.FOUR, Col.E),
        Location.from(Row.FOUR, Col.G),
        Location.from(Row.FIVE, Col.B),
        Location.from(Row.FIVE, Col.D),
        Location.from(Row.FIVE, Col.F),
        Location.from(Row.FIVE, Col.H),
        Location.from(Row.SIX, Col.A),
        Location.from(Row.SIX, Col.C),
        Location.from(Row.SIX, Col.E),
        Location.from(Row.SIX, Col.G),
        Location.from(Row.SEVEN, Col.B),
        Location.from(Row.SEVEN, Col.D),
        Location.from(Row.SEVEN, Col.F),
        Location.from(Row.SEVEN, Col.H),
        Location.from(Row.EIGHT, Col.A),
        Location.from(Row.EIGHT, Col.C),
        Location.from(Row.EIGHT, Col.E),
        Location.from(Row.EIGHT, Col.G),
    ];

    private readonly _row: Row;
    private readonly _col: Col;
    private readonly _color: Color;

    private constructor(row: Row, col: Col) {
        this._row = row;
        this._col = col;
        this._color = this.produceLocationColor(this);
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

    get color(): Color {
        return this._color;
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

    private produceLocationColor(location: Location): Color {
        if (Location.whiteBoardLocations.indexOf(location) > -1) {
            return Color.WHITE;
        }
        return Color.BLACK;
    }
}

export class Position {

    private readonly _location: Location;
    private readonly _piece: Piece;

    constructor(location: Location, piece: Piece) {
        this._location = location;
        this._piece = piece;
    }

    get location(): Location {
        return this._location;
    }

    get piece(): Piece {
        return this._piece;
    }
}

export class Positions {

    private readonly _positions: Array<Position>;

    constructor() {
        this._positions = new Array<Position>();
        this.initPositions();
    }

    private initPositions(): void {
        this.addPosition(new Position(Location.from(Row.ONE, Col.A), new Rook(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.B), new Knight(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.C), new Bishop(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.D), new Queen(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.E), new King(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.F), new Bishop(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.G), new Knight(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.ONE, Col.H), new Rook(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.A), new Pawn(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.B), new Pawn(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.C), new Pawn(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.D), new Pawn(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.E), new Pawn(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.F), new Pawn(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.G), new Pawn(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.TWO, Col.H), new Pawn(Color.WHITE)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.A), new Rook(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.B), new Knight(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.C), new Bishop(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.D), new Queen(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.E), new King(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.F), new Bishop(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.G), new Knight(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.EIGHT, Col.H), new Rook(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.A), new Pawn(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.B), new Pawn(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.C), new Pawn(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.D), new Pawn(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.E), new Pawn(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.F), new Pawn(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.G), new Pawn(Color.BLACK)));
        this.addPosition(new Position(Location.from(Row.SEVEN, Col.H), new Pawn(Color.BLACK)));
    }

    length(): number {
        return this._positions.length;
    }

    findPositionOf(pieceClass: typeof Piece, color: Color): Position | null {
        for (let position of this._positions) {
            if (position.piece instanceof pieceClass && position.piece.color == color) {
                return position;
            }
        }
        return null;
    }

    findAllPositionOf(color: Color): Array<Position> {
        let results = new Array<Position>();
        for (let position of this._positions) {
            if (position.piece.color == color) {
                results.push(position);
            }
        }
        return results;
    }

    addPosition(position: Position) {
        if (this.getPosition(position.location) == null) {
            this._positions.push(position);
        }
    }

    removePosition(position: Position) {
        let foundPos = this.getPosition(position.location);
        if (foundPos != null) {
            let index = this._positions.indexOf(foundPos);
            this._positions.splice(index, 1);
        }
    }

    getPosition(location: Location): Position | null {
        for (let position of this._positions) {
            if (position.location.row == location.row && position.location.col == location.col) {
                return position;
            }
        }
        return null;
    }

    move(source: Location, target: Location): void {
        let sourcePos = this.getPosition(source);
        this.removePosition(sourcePos);
        this.addPosition(new Position(target, sourcePos.piece))
    }
}