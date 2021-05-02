import {Piece} from "./Piece";
import {Location, Positions, Row} from "./Position";

export class Pawn extends Piece {

    availableMovesBlack(currentLocation: Location, positions: Positions): Array<Location> {
        let belowOne = currentLocation.down();
        let belowTwo = belowOne.down();
        return this.availableMovesInternal(currentLocation, positions, belowOne, belowTwo, Row.SEVEN);
    }

    availableMovesWhite(currentLocation: Location, positions: Positions): Array<Location> {
        let aboveOne = currentLocation.up();
        let aboveTwo = aboveOne.up();
        return this.availableMovesInternal(currentLocation, positions, aboveOne, aboveTwo, Row.TWO);
    }

    private availableMovesInternal(currentLocation: Location, positions: Positions, advancedOne: Location, advancedTwo: Location, initRow: Row): Array<Location> {
        let moves = new Array<Location>();

        let advancedOnePos = positions.getPosition(advancedOne);
        if (advancedOnePos == null || !advancedOnePos.hasPiece()) {
            moves.push(advancedOne);
        }

        let advancedTwoPos = positions.getPosition(advancedTwo);
        if (currentLocation.row == initRow && (advancedTwoPos == null || !advancedTwoPos.hasPiece())) {
            moves.push(advancedTwo);
        }

        let advancedLeft = advancedOne.left();
        let advancedLeftPos = positions.getPosition(advancedLeft);
        if (advancedLeftPos != null && advancedLeftPos.hasPiece() && advancedLeftPos.piece.playerColor != this.playerColor) {
            moves.push(advancedLeft);
        }

        let advancedRight = advancedOne.right();
        let advancedRightPos = positions.getPosition(advancedRight);
        if (advancedRightPos != null && advancedRightPos.hasPiece() && advancedRightPos.piece.playerColor != this.playerColor) {
            moves.push(advancedRight);
        }

        return moves;
    }
}