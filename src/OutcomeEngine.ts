import {Position, Positions} from "./Position";
import {Move} from "./Move";
import {Outcome} from "./Outcome";
import {Piece} from "./Piece";

export interface OutcomeEngine {
    isMoveAllowed(move: Move): boolean;
    calculateOutcome(positions: Positions, defeatedPieces: Array<Piece>, move: Move): Outcome;
}

export class SimpleOutcomeEngine implements OutcomeEngine {

    calculateOutcome(positions: Positions, defeatedPieces: Array<Piece>, move: Move): Outcome {
        return new Outcome();
    }

    isMoveAllowed(move: Move): boolean {
        // TODO: get piece from source of move and check isMoveAllowed on it
        //  each piece should know what moves it can do, from its position
        //  then the outcome engine decides what happened when the source moves to target
        //  if it removed an enemy piece or so
        return true;
    }
}