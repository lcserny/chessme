import {Position} from "./Position";
import {Player} from "./Player";

export class Outcome {

    private _winner: Player;
    private _winningPlayer: Player;
    private _defeatedPosition: Position;
    private _check: boolean = false;
    private _checkMate: boolean = false;

    get winner(): Player {
        return this._winner;
    }

    set winner(value: Player) {
        this._winner = value;
    }

    get winningPlayer(): Player {
        return this._winningPlayer;
    }

    set winningPlayer(value: Player) {
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

    constructor(winningPlayer: Player) {
        super();
        this.winningPlayer = winningPlayer;
        this.check = true;
    }
}

export class CheckMate extends Outcome {

    constructor(winner: Player) {
        super();
        this.winner = winner;
        this.checkMate = true;
    }
}