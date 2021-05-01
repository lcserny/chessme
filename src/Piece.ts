import {Color} from "./Player";
import {Location} from "./Position";

export abstract class Piece {

    private readonly _playerColor: Color;

    constructor(playerColor: Color) {
        this._playerColor = playerColor;
    }

    get playerColor(): Color {
        return this._playerColor;
    }

    abstract availableMoves(currentLocation: Location): Array<Location>
}