import {Piece} from "./Piece";
import {Location, Positions} from "./Position";

export class King extends Piece {

    protected readonly _name: string = "King";

    protected availableMovesBlack(currentLocation: Location, positions: Positions): Array<Location> {
        return this.availableMovesInternal(currentLocation, positions);
    }

    protected availableMovesWhite(currentLocation: Location, positions: Positions): Array<Location> {
        return this.availableMovesInternal(currentLocation, positions);
    }

    private availableMovesInternal(currentLocation: Location, positions: Positions): Array<Location> {
        let moves = new Array<Location>();
        moves = moves.concat(this.getAllDirection(currentLocation, positions, x => x.up(), true));
        moves = moves.concat(this.getAllDirection(currentLocation, positions, x => x.down(), true));
        moves = moves.concat(this.getAllDirection(currentLocation, positions, x => x.left(), true));
        moves = moves.concat(this.getAllDirection(currentLocation, positions, x => x.right(), true));
        moves = moves.concat(this.getAllDirection(currentLocation, positions,
            x => x.up() != x ? x.up().left() : x, true));
        moves = moves.concat(this.getAllDirection(currentLocation, positions,
            x => x.down() != x ? x.down().left() : x, true));
        moves = moves.concat(this.getAllDirection(currentLocation, positions,
            x => x.up() != x ? x.up().right() : x, true));
        moves = moves.concat(this.getAllDirection(currentLocation, positions,
            x => x.down() != x ? x.down().right() : x, true));
        return moves;
    }
}