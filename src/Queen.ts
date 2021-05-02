import {Piece} from "./Piece";
import {Location, Positions} from "./Position";

export class Queen extends Piece {

    protected availableMovesBlack(currentLocation: Location, positions: Positions): Array<Location> {
        return undefined;
    }

    protected availableMovesWhite(currentLocation: Location, positions: Positions): Array<Location> {
        /*
        The queen can be moved any number of unoccupied squares in a straight line vertically,
        horizontally, or diagonally. The queen captures by occupying the square on which an enemy piece sits.
         */
        let moves = new Array<Location>();



        return moves;
    }
}