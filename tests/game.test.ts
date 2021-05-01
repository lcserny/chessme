import {assert, expect} from "chai";
import {describe, it} from "mocha";
import {ChessMeGame} from "../src/ChessMeGame";
import {Player, PlayerColor} from "../src/Player";
import {Board} from "../src/Board";
import {Move} from "../src/Move";
import {Col, Location, Position, Row} from "../src/Position";
import {GameStatusError} from "../src/errors";

describe("game statuses", function () {
    let board = new Board();
    let players = new Array<Player>();
    players.push(new Player("p1", PlayerColor.WHITE))
    players.push(new Player("p2", PlayerColor.BLACK))

    it("new games have pending status", function () {
        let game = new ChessMeGame(board);
        expect(game.status.valueOf()).equals("pending");
    });

    it("game can be started", function () {
        let game = new ChessMeGame(board, players);

        game.start();

        expect(game.status.valueOf()).contains("start");
    });

    it("game can be stopped", function () {
        let game = new ChessMeGame(board, players);

        game.start();
        game.stop();

        expect(game.status.valueOf()).contains("stop");
    });

    it("game can be started only once", function () {
        let game = new ChessMeGame(board, players);

        game.start();

        let error = new Error();
        try {
            game.start();
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("GameStatusError");
    });

    it("game can be stopped only once", function () {
        let game = new ChessMeGame(board, players);

        game.start();
        game.stop();

        let error = new Error();
        try {
            game.stop();
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("GameStatusError");
    });

    it("game cannot be started without two players", function () {
        let game = new ChessMeGame(board);
        let error = new Error();
        try {
            game.start();
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("NoPlayersError");
    });
});

describe("game players", function () {
    it("2 players max can join a game", function () {
        let board = new Board();
        let game = new ChessMeGame(board);
        game.join(new Player("p1", PlayerColor.BLACK));
        game.join(new Player("p2", PlayerColor.WHITE));

        let error = new Error();
        try {
            game.join(new Player("p3", PlayerColor.BLACK));
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("TooManyPlayersError");
    });

    it("players joining the game need to be of different colors", function () {
        let board = new Board();
        let game = new ChessMeGame(board);
        game.join(new Player("p1", PlayerColor.WHITE));

        let error = new Error();
        try {
            game.join(new Player("p2", PlayerColor.WHITE));
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("SamePlayerTeamError");
    });

    it("players joining the game need to have different names", function () {
        let board = new Board();
        let game = new ChessMeGame(board);
        game.join(new Player("p1", PlayerColor.WHITE));

        let error = new Error();
        try {
            game.join(new Player("p1", PlayerColor.BLACK));
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("PlayerNameExistsError");
    });

    it("game throws error when executing move if not started", function () {
        let game = new ChessMeGame(new Board());
        let player = new Player("a", PlayerColor.WHITE);
        let move = new Move(new Position(Location.from(Row.ONE, Col.A)), new Position(Location.from(Row.TWO, Col.A)));

        let error = new Error();
        try {
            game.move(player, move);
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("GameStatusError");
    });

    it("game throws error when executing move of unknown player", function () {
        let player1 = new Player("a", PlayerColor.WHITE);
        let player2 = new Player("b", PlayerColor.BLACK);
        let player3 = new Player("c", PlayerColor.WHITE);
        let game = new ChessMeGame(new Board(), new Array<Player>(player2, player1));
        let move = new Move(new Position(Location.from(Row.ONE, Col.A)), new Position(Location.from(Row.TWO, Col.A)));
        game.start()

        let error = new Error();
        try {
            game.move(player3, move);
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("PlayerNotInGameError");
    });

    it("game executes move for player", function () {
        let player1 = new Player("a", PlayerColor.WHITE);
        let player2 = new Player("b", PlayerColor.BLACK);
        let game = new ChessMeGame(new Board(), new Array<Player>(player2, player1));
        let move = new Move(new Position(Location.from(Row.ONE, Col.A)), new Position(Location.from(Row.TWO, Col.A)));
        game.start();

        let outcome = game.move(player1, move);

        assert.notEqual(outcome, null);
    });

    it("game allows white player to start first move", function () {
        let player1 = new Player("a", PlayerColor.WHITE);
        let player2 = new Player("b", PlayerColor.BLACK);
        let game = new ChessMeGame(new Board(), new Array<Player>(player1, player2));
        let move = new Move(new Position(Location.from(Row.ONE, Col.A)), new Position(Location.from(Row.TWO, Col.A)));
        game.start();

        let error = new Error();
        try {
            game.move(player2, move);
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("PlayerTurnError");
    });

    it("game switches player turn allowed after move", function () {
        let player1 = new Player("a", PlayerColor.WHITE);
        let player2 = new Player("b", PlayerColor.BLACK);
        let game = new ChessMeGame(new Board(), new Array<Player>(player1, player2));
        let move = new Move(new Position(Location.from(Row.ONE, Col.A)), new Position(Location.from(Row.TWO, Col.A)));
        game.start();

        game.move(player1, move);

        let error = new Error();
        try {
            game.move(player1, move);
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("PlayerTurnError");
    });
});