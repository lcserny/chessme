import {Piece} from "./Piece";
import {Location} from "./Position";

export class King extends Piece {

    availableMoves(currentLocation: Location): Array<Location> {
        return undefined;
    }
}