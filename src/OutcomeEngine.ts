import {Position} from "./Position";
import {Move} from "./Move";
import {Outcome} from "./Outcome";

export interface OutcomeEngine {
    isMoveAllowed(move: Move): boolean;
    calculateOutcome(positions: Array<Position>, move: Move): Outcome;
}

export class SimpleOutcomeEngine implements OutcomeEngine {

    calculateOutcome(positions: Array<Position>, move: Move): Outcome {
        return new Outcome();
    }

    isMoveAllowed(move: Move): boolean {
        return true;
    }
}