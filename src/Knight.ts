import {Piece} from "./Piece";
import {Location, Positions} from "./Position";

export class Knight extends Piece {

    protected availableMovesBlack(currentLocation: Location, positions: Positions): Array<Location> {
        return null;
    }

    protected availableMovesWhite(currentLocation: Location, positions: Positions): Array<Location> {
        return null;
    }
}