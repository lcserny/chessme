import {Piece} from "./Piece";
import {Location} from "./Position";

export class Rook extends Piece {

    availableMoves(currentLocation: Location): Array<Location> {
        return undefined;
    }
}