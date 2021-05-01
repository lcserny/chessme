import {Piece} from "./Piece";
import {Location, Positions, Row} from "./Position";

export class Pawn extends Piece {

    availableMovesBlack(currentLocation: Location, positions: Positions): Array<Location> {
        // TODO
        return new Array<Location>();
    }

    availableMovesWhite(currentLocation: Location, positions: Positions): Array<Location> {
        let moves = new Array<Location>();

        let aboveOne = currentLocation.up();
        let aboveOnePos = positions.getPosition(aboveOne);
        if (aboveOnePos == null || !aboveOnePos.hasPiece()) {
            moves.push(aboveOne);
        }

        let aboveTwo = aboveOne.up();
        let aboveTwoPos = positions.getPosition(aboveTwo);
        if (currentLocation.row == Row.TWO && (aboveTwoPos == null || !aboveTwoPos.hasPiece())) {
            moves.push(aboveTwo);
        }

        let aboveLeft = aboveOne.left();
        let aboveLeftPos = positions.getPosition(aboveLeft);
        if (aboveLeftPos != null && aboveLeftPos.hasPiece() && aboveLeftPos.piece.playerColor != this.playerColor) {
            moves.push(aboveLeft);
        }

        let aboveRight = aboveOne.right();
        let aboveRightPos = positions.getPosition(aboveRight);
        if (aboveRightPos != null && aboveRightPos.hasPiece() && aboveRightPos.piece.playerColor != this.playerColor) {
            moves.push(aboveRight);
        }

        return moves;
    }
}