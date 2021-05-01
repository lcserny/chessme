import {Piece} from "./Piece";
import {Location} from "./Position";

export class Knight extends Piece {

    availableMoves(currentLocation: Location): Array<Location> {
        return undefined;
    }
}