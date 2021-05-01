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
        if (this.isMoveAllowed(positions, move)) {
            // decide if outcome defeated a piece or not
            return new Outcome();
        }
        throw new IllegalMoveError("Move not allowed");
    }

    private isMoveAllowed(positions: Positions, move: Move): boolean {
        let position = positions.getPosition(move.source);
        if (position == null) {
            return false;
        }

        if (!position.hasPiece()) {
            return false;
        }

        for (let availableMove of position.piece.availableMoves(move.source)) {
            if (availableMove.row == move.target.row && availableMove.col == move.target.col) {
                return true;
            }
        }

        return false;
    }
}