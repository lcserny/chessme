import { Positions} from "./Position";
import {Move} from "./Move";
import {Check, CheckMate, Outcome} from "./Outcome";
import {Piece} from "./Piece";
import {IllegalMoveError} from "./errors";
import {King} from "./King";
import {Player} from "./Player";

export interface OutcomeEngine {
    calculateOutcome(player: Player, move: Move, positions: Positions): Outcome;
}

export class SimpleOutcomeEngine implements OutcomeEngine {

    calculateOutcome(player: Player, move: Move, positions: Positions): Outcome {
        if (this.isMoveAllowed(positions, move)) {
            let source = move.source;
            let target = move.target;

            let outcome = new Outcome();
            let sourcePosition = positions.getPosition(source);
            let targetPosition = positions.getPosition(target);

            if (targetPosition != null && targetPosition.hasPiece() && targetPosition.piece.playerColor != sourcePosition.piece.playerColor) {
                outcome = this.parseCheckMate(targetPosition.piece, outcome, player);
                outcome = this.parseCheck(targetPosition.piece, outcome, player, move, positions);
                outcome.defeatedPosition = targetPosition;
            }

            player.addMove(move);
            return outcome;
        }
        throw new IllegalMoveError("Move not allowed");
    }

    private parseCheck(defeatedPiece: Piece, outcome: Outcome, player: Player, move: Move, positions: Positions): Outcome {
        // TODO: all info is here to determine if Check, but calculation is complex...
        // if (check state) {
        //     outcome = new Check(player);
        // }
        return outcome;
    }

    private parseCheckMate(defeatedPiece: Piece, outcome: Outcome, player: Player): Outcome {
        if (defeatedPiece instanceof King) {
            outcome = new CheckMate(player);
        }
        return outcome;
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