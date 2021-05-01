import {Piece} from "./Piece";
import {Location, Positions, Row} from "./Position";

export class Pawn extends Piece {

    availableMovesBlack(currentLocation: Location, positions: Positions): Array<Location> {
        let moves = new Array<Location>();

        let belowOne = currentLocation.down();
        let belowOnePos = positions.getPosition(belowOne);
        if (belowOnePos == null || !belowOnePos.hasPiece()) {
            moves.push(belowOne);
        }

        let belowTwo = belowOne.down();
        let belowTwoPos = positions.getPosition(belowTwo);
        if (currentLocation.row == Row.SEVEN && (belowTwoPos == null || !belowTwoPos.hasPiece())) {
            moves.push(belowTwo);
        }

        let belowLeft = belowOne.left();
        let belowLeftPos = positions.getPosition(belowLeft);
        if (belowLeftPos != null && belowLeftPos.hasPiece() && belowLeftPos.piece.playerColor != this.playerColor) {
            moves.push(belowLeft);
        }

        let belowRight = belowOne.right();
        let belowRightPos = positions.getPosition(belowRight);
        if (belowRightPos != null && belowRightPos.hasPiece() && belowRightPos.piece.playerColor != this.playerColor) {
            moves.push(belowRight);
        }

        return moves;
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