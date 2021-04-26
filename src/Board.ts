import {Position} from "./Position";

export class Board {

    private _positions: Array<Position> = new Array<Position>();

    get positions(): Array<Position> {
        return this._positions;
    }
}