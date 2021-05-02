import {LocationMove, Piece} from "./Piece";
import {Location, Positions} from "./Position";

export class Knight extends Piece {

    protected availableMovesBlack(currentLocation: Location, positions: Positions): Array<Location> {
        return this.availableMovesInternal(currentLocation, positions);
    }

    protected availableMovesWhite(currentLocation: Location, positions: Positions): Array<Location> {
        return this.availableMovesInternal(currentLocation, positions);
    }

    private availableMovesInternal(currentLocation: Location, positions: Positions): Array<Location> {
        let results = new Array<Location>();
        results = results.concat(this.advanceLShape(currentLocation, positions, x => x.up(), x => x.right()));
        results = results.concat(this.advanceLShape(currentLocation, positions, x => x.up(), x => x.left()));
        results = results.concat(this.advanceLShape(currentLocation, positions, x => x.left(), x => x.up()));
        results = results.concat(this.advanceLShape(currentLocation, positions, x => x.left(), x => x.down()));
        results = results.concat(this.advanceLShape(currentLocation, positions, x => x.down(), x => x.left()));
        results = results.concat(this.advanceLShape(currentLocation, positions, x => x.down(), x => x.right()));
        results = results.concat(this.advanceLShape(currentLocation, positions, x => x.right(), x => x.down()));
        results = results.concat(this.advanceLShape(currentLocation, positions, x => x.right(), x => x.up()));
        return results;
    }

    private advanceLShape(currentLocation: Location, positions: Positions, advanceMove: LocationMove, turnMove: LocationMove): Array<Location> {
        let results = new Array<Location>();
        let current = Location.from(currentLocation.row, currentLocation.col);

        let advanceOne = advanceMove(current);
        if (advanceOne != current) {
            let advanceTwo = advanceMove(advanceOne);
            if (advanceTwo != advanceOne) {
                let advancedTwoTurned = turnMove(advanceTwo);
                if (advancedTwoTurned != advanceTwo) {
                    let pos = positions.getPosition(advancedTwoTurned);
                    if (pos != null) {
                        if (pos.hasPiece() && pos.piece.playerColor != this.playerColor) {
                            results.push(advancedTwoTurned);
                        }
                    } else {
                        results.push(advancedTwoTurned);
                    }
                }
            }
        }

        return results;
    }
}