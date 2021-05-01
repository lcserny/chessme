import {Position, Positions} from "./Position";
import {OutcomeEngine, SimpleOutcomeEngine} from "./OutcomeEngine";
import {Outcome} from "./Outcome";
import {Move} from "./Move";
import {Piece} from "./Piece";

export class Board {

    private readonly _outcomeEngine: OutcomeEngine;
    private readonly _positions: Positions;
    private readonly _defeatedPieces: Array<Piece>;

    constructor(outcomeEngine?: OutcomeEngine) {
        this._positions = new Positions();
        this._defeatedPieces = new Array<Piece>();
        this._outcomeEngine = outcomeEngine == null ? new SimpleOutcomeEngine() : outcomeEngine;
    }

    get positions(): Positions {
        return this._positions;
    }

    get defeatedPieces(): Array<Piece> {
        return this._defeatedPieces;
    }

    isMoveAllowed(move: Move): boolean {
        return this._outcomeEngine.isMoveAllowed(move);
    }

    calculateOutcome(move: Move): Outcome {
        let outcome = this._outcomeEngine.calculateOutcome(this.positions, this.defeatedPieces, move);
        this.updateBoard(outcome);
        return outcome;
    }

    private updateBoard(outcome: Outcome): void {
        // TODO: if outcome contains defeated piece, add it to the list and remove from positions
    }
}