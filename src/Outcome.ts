import {Position} from "./Position";
import {Player} from "./Player";

export class Outcome {

    private _winner: Player;
    private _winningPlayer: Player;
    private _defeatedPosition: Position;

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
}

export class Check extends Outcome {
}

export class CheckMate extends Outcome {
}