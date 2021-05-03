import {Position} from "./Position";
import {Color} from "./Player";

export class Outcome {

    private _winner: Color;
    private _winningPlayer: Color;
    private _defeatedPosition: Position;
    private _check: boolean = false;
    private _checkMate: boolean = false;

    get winner(): Color {
        return this._winner;
    }

    set winner(value: Color) {
        this._winner = value;
    }

    get winningPlayer(): Color {
        return this._winningPlayer;
    }

    set winningPlayer(value: Color) {
        this._winningPlayer = value;
    }

    hasDefeatedPosition(): boolean {
        return this.defeatedPosition != null;
    }

    get defeatedPosition(): Position {
        return this._defeatedPosition;
    }

    set defeatedPosition(value: Position) {
        this._defeatedPosition = value;
    }

    get check(): boolean {
        return this._check;
    }

    set check(value: boolean) {
        this._check = value;
    }

    get checkMate(): boolean {
        return this._checkMate;
    }

    set checkMate(value: boolean) {
        this._checkMate = value;
    }
}

export class Check extends Outcome {

    constructor(winningPlayer: Color) {
        super();
        this.winningPlayer = winningPlayer;
        this.check = true;
    }
}

export class CheckMate extends Outcome {

    constructor(winner: Color) {
        super();
        this.winner = winner;
        this.checkMate = true;
    }
}