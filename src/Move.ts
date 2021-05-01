import {Location} from "./Position";

export class Move {

    private readonly _source: Location;
    private readonly _target: Location;

    constructor(source: Location, target: Location) {
        this._source = source;
        this._target = target;
    }

    get source(): Location {
        return this._source;
    }

    get target(): Location {
        return this._target;
    }
}