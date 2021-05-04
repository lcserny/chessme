import {Location, Position, Positions} from "./Position";
import {Move} from "./Move";
import {Outcome} from "./Outcome";
import {Piece} from "./Piece";
import {IllegalMoveError} from "./errors";
import {King} from "./King";
import {Color, Player, reverseColor} from "./Player";

export interface OutcomeEngine {
    calculateOutcome(player: Player, move: Move, positions: Positions): Outcome;
    parseCheck(playerColor: Color, positions: Positions, outcome: Outcome): Outcome;
}

export class SimpleOutcomeEngine implements OutcomeEngine {

    calculateOutcome(player: Player, move: Move, positions: Positions): Outcome {
        if (this.isMoveAllowed(positions, move)) {
            let outcome = new Outcome();

            let sourcePosition = positions.getPosition(move.source);
            let targetPosition = positions.getPosition(move.target);
            if (targetPosition != null && targetPosition.hasPiece() && targetPosition.piece.color != sourcePosition.piece.color) {
                outcome = this.parseCheckMate(targetPosition.piece, outcome, player.color);
                outcome.defeatedPosition = targetPosition;
            }

            return outcome;
        }
        throw new IllegalMoveError("Move not allowed");
    }

    private parseCheckMate(defeatedPiece: Piece, outcome: Outcome, playerColor: Color): Outcome {
        if (defeatedPiece instanceof King) {
            outcome.checkMate = true;
            outcome.winner = playerColor;
        }
        return outcome;
    }

    parseCheck(playerColor: Color, positions: Positions, outcome: Outcome): Outcome {
        outcome = this.parseCheckInternal(playerColor, positions, outcome);
        outcome = this.parseCheckInternal(reverseColor(playerColor), positions, outcome);
        return outcome;
    }

    private parseCheckInternal(color: Color, positions: Positions, outcome: Outcome): Outcome {
        let enemyKingPosition = positions.findPositionOf(King, reverseColor(color));
        if (enemyKingPosition != null) {
            for (let position of positions.findAllPositionOf(color)) {
                for (let availableMove of position.piece.availableMoves(position.location, positions)) {
                    if (availableMove.row == enemyKingPosition.location.row && availableMove.col == enemyKingPosition.location.col) {
                        outcome.check = true;
                        outcome.winningPlayer = color;
                        return outcome;
                    }
                }
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