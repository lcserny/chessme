import {Position} from "./Position";
import {OutcomeEngine, SimpleOutcomeEngine} from "./OutcomeEngine";
import {Outcome} from "./Outcome";
import {Move} from "./Move";

export class Board {

    private readonly _outcomeEngine: OutcomeEngine;

    private _positions: Array<Position> = new Array<Position>();

    constructor(outcomeEngine?: OutcomeEngine) {
        this._outcomeEngine = outcomeEngine == null ? new SimpleOutcomeEngine() : outcomeEngine;
    }

    get positions(): Array<Position> {
        return this._positions;
    }

    isMoveAllowed(move: Move): boolean {
        return this._outcomeEngine.isMoveAllowed(move);
    }

    calculateOutcome(move: Move): Outcome {
        let outcome = this._outcomeEngine.calculateOutcome(this.positions, move);
        this.refreshPositions(outcome);
        return outcome;
    }

    private refreshPositions(outcome: Outcome): void {
        // TODO
    }
}