import {Color} from "./Player";
import {Location, Positions} from "./Position";

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
}