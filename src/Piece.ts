import {Color} from "./Player";
import {Location, Positions} from "./Position";

export type LocationMove = (x: Location) => Location;

export abstract class Piece {

    private readonly _playerColor: Color;

    constructor(playerColor: Color) {
        this._playerColor = playerColor;
    }

    get playerColor(): Color {
        return this._playerColor;
    }

    availableMoves(currentLocation: Location, positions: Positions): Array<Location> {
        if (this._playerColor == Color.WHITE) {
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
                if (pos.hasPiece() && pos.piece.playerColor != this.playerColor) {
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