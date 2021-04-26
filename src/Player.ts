export enum PlayerColor {
    WHITE = "white",
    BLACK = "black"
}

export class Player {

    private readonly _color: PlayerColor;

    constructor(color: PlayerColor) {
        this._color = color;
    }

    get color(): PlayerColor {
        return this._color;
    }
}