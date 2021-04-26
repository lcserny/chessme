import {Position} from "./Position";

export class Move {

    private readonly _source: Position;
    private readonly _target: Position;

    constructor(source: Position, target: Position) {
        this._source = source;
        this._target = target;
    }

    get source(): Position {
        return this._source;
    }

    get target(): Position {
        return this._target;
    }
}