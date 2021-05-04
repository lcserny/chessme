import {Position, Positions} from "./Position";
import {OutcomeEngine, SimpleOutcomeEngine} from "./OutcomeEngine";
import {Outcome} from "./Outcome";
import {Move} from "./Move";
import {Piece} from "./Piece";
import {Player} from "./Player";

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

    calculateOutcome(player: Player, move: Move): Outcome {
        let outcome = this._outcomeEngine.calculateOutcome(player, move, this.positions);
        this.updatePositions(move, outcome);
        this._outcomeEngine.updateCheckStates(player, outcome);
        return outcome;
    }

    private updatePositions(move: Move, outcome: Outcome): void {
        if (outcome.hasDefeatedPosition()) {
            this.defeatedPieces.push(outcome.defeatedPosition.piece);
            this.positions.removePosition(outcome.defeatedPosition);
        }
        this.positions.move(move.source, move.target);
        outcome.positions = this.positions;
    }
}