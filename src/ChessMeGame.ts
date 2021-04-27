import {Player} from "./Player";
import {GameStatusError, NoPlayersError, SamePlayerTeamError, TooManyPlayersError} from "./errors";
import {Board} from "./Board";

enum GameStatus {
    STARTED = "started",
    PENDING = "pending",
    STOPPED = "stopped"
}

export class ChessMeGame {

    private readonly _board: Board;

    private _status: GameStatus;
    private _players: Array<Player>;

    constructor(board: Board, players?: Array<Player>) {
        this._board = board;
        this._status = GameStatus.PENDING;
        this._players = players == null ? new Array<Player>() : players;
        this.checkPlayerTeams();
    }

    board(): Board {
        return this._board;
    }

    join(player: Player): void {
        if (this._players.length == 2) {
            throw new TooManyPlayersError("Cannot join game, two players already present");
        }
        this._players.push(player);
        this.checkPlayerTeams();
    }

    start(): void {
        if (this._players.length != 2) {
            throw new NoPlayersError("No players joined the game");
        }
        if (this._status == GameStatus.STARTED) {
            throw new GameStatusError("Game already started");
        }
        this._status = GameStatus.STARTED;
    }

    stop(): void {
        if (this._status == GameStatus.STOPPED) {
            throw new GameStatusError("Game already stopped");
        }
        this._status = GameStatus.STOPPED
    }

    status(): string {
        return this._status.valueOf()
    }

    private checkPlayerTeams(): void {
        if (this._players.length == 2) {
            if (this._players[0].color == this._players[1].color) {
                throw new SamePlayerTeamError("Both players joining the game cannot be of same color");
            }
        }
    }
}