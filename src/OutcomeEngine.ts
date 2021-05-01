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
            let source = move.source;
            let target = move.target;

            let outcome = new Outcome();
            if (positions.getPosition(target) != null
                && positions.getPosition(target).hasPiece()
                && positions.getPosition(target).piece.playerColor != positions.getPosition(source).piece.playerColor) {
                outcome.defeatedPosition = positions.getPosition(target);
            }
            return outcome;
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

        for (let availableMove of position.piece.availableMoves(move.source, positions)) {
            if (availableMove.row == move.target.row && availableMove.col == move.target.col) {
                return true;
            }
        }

        return false;
    }
}