import { Positions} from "./Position";
import {Move} from "./Move";
import {CheckMate, Outcome} from "./Outcome";
import {Piece} from "./Piece";
import {IllegalMoveError} from "./errors";
import {King} from "./King";

export interface OutcomeEngine {
    calculateOutcome(positions: Positions, defeatedPieces: Array<Piece>, move: Move): Outcome;
}

export class SimpleOutcomeEngine implements OutcomeEngine {

    calculateOutcome(positions: Positions, defeatedPieces: Array<Piece>, move: Move): Outcome {
        if (this.isMoveAllowed(positions, move)) {
            let source = move.source;
            let target = move.target;

            let outcome = new Outcome();
            let sourcePosition = positions.getPosition(source);
            let targetPosition = positions.getPosition(target);

            if (targetPosition != null && targetPosition.hasPiece() && targetPosition.piece.playerColor != sourcePosition.piece.playerColor) {
                if (targetPosition.piece instanceof King) {
                    outcome = new CheckMate();
                }
                // TODO: all info is here to determine if Check, but calculation is complex...
                outcome.defeatedPosition = targetPosition;
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