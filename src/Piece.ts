import {PlayerColor} from "./Player";

export abstract class Piece {

    private readonly _playerColor: PlayerColor;

    constructor(playerColor: PlayerColor) {
        this._playerColor = playerColor;
    }

    get playerColor(): PlayerColor {
        return this._playerColor;
    }
}