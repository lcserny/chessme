import {Location, Position, Positions} from "./Position";
import {Move} from "./Move";
import {Check, CheckMate, Outcome} from "./Outcome";
import {Piece} from "./Piece";
import {IllegalMoveError} from "./errors";
import {King} from "./King";
import {Color, Player, reverseColor} from "./Player";

export interface OutcomeEngine {
    calculateOutcome(player: Player, move: Move, positions: Positions): Outcome;
}

export class SimpleOutcomeEngine implements OutcomeEngine {

    calculateOutcome(player: Player, move: Move, positions: Positions): Outcome {
        if (this.isMoveAllowed(positions, move)) {
            let outcome = new Outcome();
            outcome = this.parseCheck(player, move, positions, outcome);

            let sourcePosition = positions.getPosition(move.source);
            let targetPosition = positions.getPosition(move.target);
            if (targetPosition != null && targetPosition.hasPiece() && targetPosition.piece.playerColor != sourcePosition.piece.playerColor) {
                outcome = this.parseCheckMate(targetPosition.piece, outcome, player);
                outcome.defeatedPosition = targetPosition;
            }

            player.addMove(move);
            return outcome;
        }
        throw new IllegalMoveError("Move not allowed");
    }

    private parseCheckMate(defeatedPiece: Piece, outcome: Outcome, player: Player): Outcome {
        if (defeatedPiece instanceof King) {
            return new CheckMate(player);
        }
        return outcome;
    }

    // TODO: when player moves, player might be checked instead of enemy
    private parseCheck(player: Player, move: Move, positions: Positions, outcome: Outcome): Outcome {
        let endMovePosition = new Position(move.target, positions.getPosition(move.source).piece);
        let enemyKingPosition = positions.findPositionOf(King, reverseColor(player.color));

        let availableMoves = endMovePosition.piece.availableMoves(endMovePosition.location, positions);
        for (let availableMove of availableMoves) {
            if (availableMove.row == enemyKingPosition.location.row && availableMove.col == enemyKingPosition.location.col) {
                return new Check(player);
            }
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