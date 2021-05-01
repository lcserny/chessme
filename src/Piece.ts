import {PlayerColor} from "./Player";

export class Piece {

    private readonly _playerColor: PlayerColor;

    constructor(playerColor: PlayerColor) {
        this._playerColor = playerColor;
    }

    get playerColor(): PlayerColor {
        return this._playerColor;
    }
}

export class NoPiece extends Piece {

    constructor() {
        super(null);
    }
}