import {Piece} from "./Piece";
import {Location} from "./Position";

export class Pawn extends Piece {

    availableMoves(currentLocation: Location): Array<Location> {
        return undefined;
    }
}