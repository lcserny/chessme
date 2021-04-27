import {Position} from "./Position";
import {OutcomeEngine, SimpleOutcomeEngine} from "./OutcomeEngine";
import {Outcome} from "./Outcome";
import {Move} from "./Move";

export class Board {

    private readonly _outcomeEngine: OutcomeEngine;
    private readonly _positions: Array<Position>;

    constructor(outcomeEngine?: OutcomeEngine) {
        this._positions = new Array<Position>();
        this._outcomeEngine = outcomeEngine == null ? new SimpleOutcomeEngine() : outcomeEngine;
        this.initPositions();
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

    private initPositions(): void {
        // TODO
    }

    private refreshPositions(outcome: Outcome): void {
        // TODO
    }
}