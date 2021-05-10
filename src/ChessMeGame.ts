import {Color, Player} from "./Player";
import {
    GameStatusError,
    NoPlayersError,
    PlayerNameExistsError,
    PlayerNotInGameError,
    PlayerTurnError,
    SamePlayerTeamError,
    TooManyPlayersError
} from "./errors";
import {Board} from "./Board";
import {Outcome} from "./Outcome";
import {Move} from "./Move";
import {v4 as uuidv4} from 'uuid';

enum GameStatus {
    STARTED = "started",
    PENDING = "pending",
    STOPPED = "stopped"
}

export class ChessMeGame {

    private readonly _session: string;
    private readonly _board: Board;
    private readonly _players: Array<Player>;

    private _status: GameStatus;
    private _playerToMove: Player;

    constructor(board: Board, players?: Array<Player>) {
        this._session = uuidv4();
        this._board = board;
        this._status = GameStatus.PENDING;
        this._players = players == null ? new Array<Player>() : players;

        this.addSessionToPlayers();
        this.checkPlayerTeams();
    }

    get status(): string {
        return this._status;
    }

    get session(): string {
        return this._session;
    }

    join(player: Player): void {
        this.checkPlayerNameExists(player);
        if (this._players.length == 2) {
            throw new TooManyPlayersError("Cannot join game, two players already present");
        }
        this._players.push(player);
        this.addSessionToPlayers();
        this.checkPlayerTeams();
    }

    move(player: Player, move: Move): Outcome {
        if (this.status != GameStatus.STARTED) {
            throw new GameStatusError("Game not started, cannot move");
        }

        this.checkPlayerIsPlaying(player);
        this.checkPlayerTurn(player);

        let outcome = this._board.calculateOutcome(player, move);
        if (outcome.checkMate) {
            this.stop();
        }

        player.addMove(move);
        this.switchPlayerToMove(player);

        // TODO: outcome should be pushed to all players instead of returned here
        return outcome;
    }

    private start(): void {
        if (this._players.length != 2) {
            throw new NoPlayersError("No players joined the game");
        }
        if (this._status == GameStatus.STARTED) {
            throw new GameStatusError("Game already started");
        }
        this._status = GameStatus.STARTED;
    }

    private stop(): void {
        if (this._status == GameStatus.STOPPED) {
            throw new GameStatusError("Game already stopped");
        }
        this._status = GameStatus.STOPPED
    }

    private addSessionToPlayers(): void {
        for (let player of this._players) {
            player.gameSession = this._session;
        }
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
        let playerIsPlaying = false;
        for (let pl of this._players) {
            if (pl.name == player.name) {
                playerIsPlaying = true;
                break
            }
        }
        if (!playerIsPlaying) {
            throw new PlayerNotInGameError("Player passed has not joined the game");
        }
    }

    private switchPlayerToMove(player: Player): void {
        for (let pl of this._players) {
            if (player.name != pl.name) {
                this._playerToMove = pl;
                break
            }
        }
    }

    private checkPlayerTeams(): void {
        if (this._players.length == 2) {
            if (this._players[0].color == this._players[1].color) {
                throw new SamePlayerTeamError("Both players joining the game cannot be of same color");
            }
            for (let player of this._players) {
                if (player.color == Color.WHITE) {
                    this._playerToMove = player;
                    break
                }
            }
            this.start();
        }
    }

    private checkPlayerTurn(player: Player) {
        if (this._playerToMove != null && this._playerToMove.name != player.name) {
            throw new PlayerTurnError("Not player's turn to move");
        }
    }
}