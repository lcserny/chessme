import {Positions} from "./Position";
import {Move} from "./Move";
import {Outcome} from "./Outcome";
import {IllegalMoveError} from "./errors";
import {King} from "./King";
import {Color, Player, reverseColor} from "./Player";

export interface OutcomeEngine {
    calculateOutcome(player: Player, move: Move, positions: Positions): Outcome;
    updateCheckStates(player: Player, outcome: Outcome);
}

export class SimpleOutcomeEngine implements OutcomeEngine {

    calculateOutcome(player: Player, move: Move, positions: Positions): Outcome {
        if (this.isMoveAllowed(positions, move)) {
            let outcome = new Outcome();
            let sourcePosition = positions.getPosition(move.source);
            let targetPosition = positions.getPosition(move.target);
            if (targetPosition != null && targetPosition.hasPiece() && targetPosition.piece.color != sourcePosition.piece.color) {
                outcome.defeatedPosition = targetPosition;
            }
            return outcome;
        }
        throw new IllegalMoveError("Move not allowed");
    }

    updateCheckStates(player: Player, outcome: Outcome) {
        this.parseCheckMate(player.color, outcome);
        this.parseCheck(player.color, outcome);
        this.parseCheck(reverseColor(player.color), outcome);
    }

    private parseCheckMate(playerColor: Color, outcome: Outcome) {
        if (outcome.hasDefeatedPosition() && outcome.defeatedPosition.piece instanceof King) {
            outcome.checkMate = true;
            outcome.winner = playerColor;
        }
    }

    private parseCheck(color: Color, outcome: Outcome) {
        let enemyKingPosition = outcome.positions.findPositionOf(King, reverseColor(color));
        if (enemyKingPosition != null) {
            for (let position of outcome.positions.findAllPositionOf(color)) {
                for (let availableMove of position.piece.availableMoves(position.location, outcome.positions)) {
                    if (availableMove.row == enemyKingPosition.location.row && availableMove.col == enemyKingPosition.location.col) {
                        outcome.check = true;
                        outcome.winningPlayer = color;
                        break;
                    }
                }
            }
        }
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