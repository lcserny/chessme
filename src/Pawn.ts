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
        if (positions.getPosition(aboveOne) == null || !positions.getPosition(aboveOne).hasPiece()) {
            moves.push(aboveOne);
        }

        let aboveTwo = aboveOne.up();
        if (currentLocation.row == Row.TWO
            && (positions.getPosition(aboveTwo) == null || !positions.getPosition(aboveTwo).hasPiece())) {
            moves.push(aboveTwo);
        }

        let aboveLeft = aboveOne.left();
        if (positions.getPosition(aboveLeft) != null
            && positions.getPosition(aboveLeft).hasPiece()
            && positions.getPosition(aboveLeft).piece.playerColor != this.playerColor) {
            moves.push(aboveLeft);
        }

        let aboveRight = aboveOne.right();
        if (positions.getPosition(aboveRight) != null
            && positions.getPosition(aboveRight).hasPiece()
            && positions.getPosition(aboveRight).piece.playerColor != this.playerColor) {
            moves.push(aboveRight);
        }

        return moves;
    }
}