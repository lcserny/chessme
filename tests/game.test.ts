import {assert, expect} from "chai";
import {describe, it} from "mocha";
import {ChessMeGame} from "../src/ChessMeGame";
import {Player, PlayerColor} from "../src/Player";
import {Board} from "../src/Board";

describe("game statuses", function () {
    let board = new Board();
    let players = new Array<Player>();
    players.push(new Player("p1", PlayerColor.WHITE))
    players.push(new Player("p2", PlayerColor.BLACK))

    it("new games have pending status", function () {
        let game = new ChessMeGame(board);
        expect(game.status()).contains("pending");
    });

    it("game can be started", function () {
        let game = new ChessMeGame(board, players);

        game.start();

        expect(game.status()).contains("start");
    });

    it("game can be stopped", function () {
        let game = new ChessMeGame(board, players);

        game.start();
        game.stop();

        expect(game.status()).contains("stop");
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

    it("game throws error when trying to make not-joined player move", function () {
        // TODO
    });

    it("game can make move for player", function () {
        // TODO
        // assert.notEqual(outcome, null);
    });
});