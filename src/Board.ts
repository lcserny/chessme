import {Position} from "./Position";
import {OutcomeEngine, SimpleOutcomeEngine} from "./OutcomeEngine";
import {Outcome} from "./Outcome";
import {Move} from "./Move";
import {Piece} from "./Piece";

export class Board {

    private readonly _outcomeEngine: OutcomeEngine;
    private readonly _positions: Array<Position>;
    private readonly _defeatedPieces: Array<Piece>;

    constructor(outcomeEngine?: OutcomeEngine) {
        this._positions = new Array<Position>();
        this._defeatedPieces = new Array<Piece>();
        this._outcomeEngine = outcomeEngine == null ? new SimpleOutcomeEngine() : outcomeEngine;
        this.initPositions();
    }

    get positions(): Array<Position> {
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

    private initPositions(): void {
        // TODO
    }

    private updateBoard(outcome: Outcome): void {
        // TODO: if outcome contains defeated piece, add it to the list and remove from positions
    }
}