import {Color} from "./Player";
import {Location, Positions} from "./Position";

export type LocationMove = (x: Location) => Location;

export abstract class Piece {

    private readonly _color: Color;
    protected abstract readonly _name: string;

    constructor(playerColor: Color) {
        this._color = playerColor;
    }

    get color(): Color {
        return this._color;
    }

    get name(): string {
        return this._name;
    }

    availableMoves(currentLocation: Location, positions: Positions): Array<Location> {
        if (this._color == Color.WHITE) {
            return this.availableMovesWhite(currentLocation, positions);
        }
        return this.availableMovesBlack(currentLocation, positions);
    }

    protected abstract availableMovesWhite(currentLocation: Location, positions: Positions): Array<Location>;
    protected abstract availableMovesBlack(currentLocation: Location, positions: Positions): Array<Location>;

    protected getAllDirection(currentLocation: Location, positions: Positions, locMove: LocationMove, oneMoveOnly = false): Array<Location> {
        let results = new Array<Location>();

        let current = Location.from(currentLocation.row, currentLocation.col);
        let tryDirection = true;

        while (tryDirection) {
            let advanced = locMove(current);
            if (advanced == current) {
                tryDirection = false;
                break;
            }

            let pos = positions.getPosition(advanced);
            if (pos != null) {
                tryDirection = false;
                if (pos.hasPiece() && pos.piece.color != this.color) {
                    results.push(advanced);
                }
            } else {
                results.push(advanced);
            }

            current = advanced;

            if (oneMoveOnly) {
                tryDirection = false;
                break;
            }
        }

        return results;
    }
}