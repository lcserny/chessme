import { Positions} from "./Position";
import {Move} from "./Move";
import {Outcome} from "./Outcome";
import {Piece} from "./Piece";
import {IllegalMoveError} from "./errors";

export interface OutcomeEngine {
    calculateOutcome(positions: Positions, defeatedPieces: Array<Piece>, move: Move): Outcome;
}

export class SimpleOutcomeEngine implements OutcomeEngine {

    calculateOutcome(positions: Positions, defeatedPieces: Array<Piece>, move: Move): Outcome {
        if (this.isMoveAllowed(move)) {
            return new Outcome();
        }
        throw new IllegalMoveError("Move not allowed");
    }

    private isMoveAllowed(move: Move): boolean {
        // TODO: get piece from source of move and check isMoveAllowed on it
        //  each piece should know what moves it can do, from its position
        //  then the outcome engine decides what happened when the source moves to target
        //  if it removed an enemy piece or so
        return true;
    }
}