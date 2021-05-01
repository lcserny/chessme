import {PlayerColor} from "./Player";
import {Col, Position, Row, Location} from "./Position";

export abstract class Piece {

    private readonly _playerColor: PlayerColor;

    constructor(playerColor: PlayerColor) {
        this._playerColor = playerColor;
    }

    get playerColor(): PlayerColor {
        return this._playerColor;
    }

    abstract availableMoves(currentLocation: Location): Array<Location>
}