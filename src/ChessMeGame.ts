import {Player} from "./Player";
import {
    GameStatusError,
    NoPlayersError,
    PlayerNameExistsError,
    PlayerNotInGameError,
    SamePlayerTeamError,
    TooManyPlayersError
} from "./errors";
import {Board} from "./Board";
import {NotAllowed, Outcome} from "./Outcome";
import {Move} from "./Move";

enum GameStatus {
    STARTED = "started",
    PENDING = "pending",
    STOPPED = "stopped"
}

export class ChessMeGame {

    private readonly _board: Board;
    private readonly _players: Array<Player>;

    private _status: GameStatus;

    constructor(board: Board, players?: Array<Player>) {
        this._board = board;
        this._status = GameStatus.PENDING;
        this._players = players == null ? new Array<Player>() : players;

        this.checkPlayerTeams();
    }

    join(player: Player): void {
        this.checkPlayerNameExists(player);
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

    move(player: Player, move: Move): Outcome {
        this.checkPlayerIsPlaying(player);
        if (player.canMove && this._board.isMoveAllowed(move)) {
            player.addMove(move);
            return this._board.calculateOutcome(move);
        }
        return new NotAllowed();
    }

    private checkPlayerNameExists(player: Player): void {
        for (let i = 0; i < this._players.length; i++) {
            let pl = this._players[i];
            if (pl.name == player.name) {
                throw new PlayerNameExistsError("Player name already taken");
            }
        }
    }

    private checkPlayerIsPlaying(player: Player): void {
        let playerIsPlaying: boolean = false;
        for (let i = 0; i < this._players.length; i++) {
            let pl = this._players[i];
            if (pl.name == player.name) {
                playerIsPlaying = true;
                break
            }
        }
        if (!playerIsPlaying) {
            throw new PlayerNotInGameError("Player passed has not joined the game");
        }
    }

    private checkPlayerTeams(): void {
        if (this._players.length == 2) {
            if (this._players[0].color == this._players[1].color) {
                throw new SamePlayerTeamError("Both players joining the game cannot be of same color");
            }
        }
    }
}