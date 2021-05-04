import {Piece} from "./Piece";
import {Location, Positions} from "./Position";

export class Rook extends Piece {

    protected readonly _name: string = "Rook";

    protected availableMovesBlack(currentLocation: Location, positions: Positions): Array<Location> {
        return this.availableMovesInternal(currentLocation, positions);
    }

    protected availableMovesWhite(currentLocation: Location, positions: Positions): Array<Location> {
        return this.availableMovesInternal(currentLocation, positions);
    }

    private availableMovesInternal(currentLocation: Location, positions: Positions): Array<Location> {
        let moves = new Array<Location>();
        moves = moves.concat(this.getAllDirection(currentLocation, positions, x => x.up()));
        moves = moves.concat(this.getAllDirection(currentLocation, positions, x => x.down()));
        moves = moves.concat(this.getAllDirection(currentLocation, positions, x => x.left()));
        moves = moves.concat(this.getAllDirection(currentLocation, positions, x => x.right()));
        return moves;
    }
}