import {assert} from "chai";
import {OutcomeEngine, SimpleOutcomeEngine} from "../src/OutcomeEngine";
import {Positions} from "../src/Position";
import {Piece} from "../src/Piece";
import {Move} from "../src/Move";
import {Outcome} from "../src/Outcome";

export class OutcomeEngineSpy extends SimpleOutcomeEngine{

    calculateOutcomeCalled = 0;

    calculateOutcome(positions: Positions, defeatedPieces: Array<Piece>, move: Move): Outcome {
        this.calculateOutcomeCalled++;
        return super.calculateOutcome(positions, defeatedPieces, move);
    }
}

export class ConfigurableOutcomeEngine implements OutcomeEngine {

    private readonly _outcome: Outcome;

    constructor(outcome?: Outcome) {
        this._outcome = outcome == null ? new Outcome() : outcome;
    }

    calculateOutcome(positions: Positions, defeatedPieces: Array<Piece>, move: Move): Outcome {
        return this._outcome;
    }
}

export function assertError(errName: string, func: Function): void  {
    let err = new Error();
    try {
        func();
    } catch (e) {
        err = e;
    }
    assert.equal(err.name, errName)
}