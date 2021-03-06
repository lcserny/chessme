import {assert, expect} from "chai";
import {describe, it} from "mocha";
import {ChessMeGame} from "../src/ChessMeGame";
import {Color, Player} from "../src/Player";
import {Board} from "../src/Board";
import {Move} from "../src/Move";
import {Col, Location, Row} from "../src/Position";
import {GameStatusError} from "../src/errors";
import {assertError, getTwoPlayers} from "./common.test";

describe("game statuses", function () {
    let board = new Board();
    let players = getTwoPlayers();

    it("new games have pending status", function () {
        let game = new ChessMeGame(board);
        expect(game.status.valueOf()).equals("pending");
    });

    it("game with players is started", function () {
        let game = new ChessMeGame(board, players);
        expect(game.status.valueOf()).contains("start");
    });
});

describe("game players", function () {
    it("2 players max can join a game", function () {
        let board = new Board();
        let game = new ChessMeGame(board);
        game.join(new Player("p1", Color.BLACK));
        game.join(new Player("p2", Color.WHITE));

        assertError("TooManyPlayersError", function () {
            game.join(new Player("p3", Color.BLACK));
        });
    });

    it("players joining the game need to be of different colors", function () {
        let board = new Board();
        let game = new ChessMeGame(board);
        game.join(new Player("p1", Color.WHITE));

        assertError("SamePlayerTeamError", function () {
            game.join(new Player("p2", Color.WHITE));
        });
    });

    it("players joining the game need to have different names", function () {
        let board = new Board();
        let game = new ChessMeGame(board);
        game.join(new Player("p1", Color.WHITE));

        assertError("PlayerNameExistsError", function () {
            game.join(new Player("p1", Color.BLACK));
        });
    });

    it("game throws error when executing move if not started", function () {
        let game = new ChessMeGame(new Board());
        let player = new Player("a", Color.WHITE);
        let move = new Move(Location.from(Row.ONE, Col.A), Location.from(Row.TWO, Col.A));

        assertError("GameStatusError", function () {
            game.move(player, move);
        });
    });

    it("game throws error when executing move of unknown player", function () {
        let player1 = new Player("a", Color.WHITE);
        let player2 = new Player("b", Color.BLACK);
        let player3 = new Player("c", Color.WHITE);
        let game = new ChessMeGame(new Board(), new Array<Player>(player2, player1));
        let move = new Move(Location.from(Row.ONE, Col.A), Location.from(Row.TWO, Col.A));

        assertError("PlayerNotInGameError", function () {
            game.move(player3, move);
        });
    });

    it("game executes move for player", function () {
        let players = getTwoPlayers();
        let game = new ChessMeGame(new Board(), players);
        let move = new Move(Location.from(Row.TWO, Col.A), Location.from(Row.THREE, Col.A));

        let outcome = game.move(players[0], move);

        assert.notEqual(outcome, null);
    });

    it("game allows white player to start first move", function () {
        let players = getTwoPlayers();
        let game = new ChessMeGame(new Board(), players);
        let move = new Move(Location.from(Row.ONE, Col.A), Location.from(Row.TWO, Col.A));

        assertError("PlayerTurnError", function () {
            game.move(players[1], move);
        });
    });

    it("game switches player turn allowed after move", function () {
        let players = getTwoPlayers();
        let game = new ChessMeGame(new Board(), players);
        let move = new Move(Location.from(Row.TWO, Col.A), Location.from(Row.THREE, Col.A));

        game.move(players[0], move);

        assertError("PlayerTurnError", function () {
            game.move(players[0], move);
        });
    });

    it("game stops when king is defeated, outcome is CheckMate", function () {
        let players = getTwoPlayers();
        let firstPlayer = players[0];
        let board = new Board();
        let game = new ChessMeGame(board, players);

        board.positions.move(Location.from(Row.ONE, Col.B), Location.from(Row.SIX, Col.D));

        let outcome = game.move(firstPlayer, new Move(Location.from(Row.SIX, Col.D), Location.from(Row.EIGHT, Col.E)));

        expect(game.status.valueOf()).contains("stop");
        expect(outcome.checkMate).to.be.true;
        expect(outcome.winner).equals(firstPlayer.color);
    });

    it("new games have a session ID shared with the players joining", function () {
        let players = getTwoPlayers();
        let game = new ChessMeGame(new Board(), players);

        let session = game.session;

        assert.isNotNull(session);
        expect(players[0].gameSession).equals(session);
        expect(players[1].gameSession).equals(session);
    });
});