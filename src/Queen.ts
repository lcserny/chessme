import {Piece} from "./Piece";
import {Location, Positions} from "./Position";

export class Queen extends Piece {

    protected readonly _name: string = "Queen";

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
        moves = moves.concat(this.getAllDirection(currentLocation, positions,
                x => x.up() != x ? x.up().left() : x));
        moves = moves.concat(this.getAllDirection(currentLocation, positions,
                x => x.down() != x ? x.down().left() : x));
        moves = moves.concat(this.getAllDirection(currentLocation, positions,
                x => x.up() != x ? x.up().right() : x));
        moves = moves.concat(this.getAllDirection(currentLocation, positions,
                x => x.down() != x ? x.down().right() : x));
        return moves;
    }
}