import {Move} from "./Move";
import {NotAllowed, Outcome} from "./Outcome";
import {Board} from "./Board";

export enum PlayerColor {
    WHITE = "white",
    BLACK = "black"
}

export class Player {

    private readonly _color: PlayerColor;
    private readonly _board: Board;

    private _moves: Array<Move> = new Array<Move>();

    constructor(color: PlayerColor, board: Board) {
        this._color = color;
        this._board = board;
    }

    get color(): PlayerColor {
        return this._color;
    }

    get moves(): Array<Move> {
        return this._moves;
    }

    get board(): Board {
        return this._board;
    }

    move(move: Move): Outcome {
        if (this.board.isMoveAllowed(move)) {
            this._moves.push(move);
            return this.board.calculateOutcome(move);
        }
        return new NotAllowed();
    }
}