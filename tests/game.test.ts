import {expect} from "chai";
import {describe, it} from "mocha";
import {ChessMeGame} from "../src/ChessMeGame";
import {Player, PlayerColor} from "../src/Player";
import {Board} from "../src/Board";

describe("game statuses", function () {
    let board = new Board();
    let players = new Array<Player>();
    players.push(new Player(PlayerColor.WHITE, board))
    players.push(new Player(PlayerColor.BLACK, board))

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
        game.join(new Player(PlayerColor.BLACK, board));
        game.join(new Player(PlayerColor.WHITE, board));

        let error = new Error();
        try {
            game.join(new Player(PlayerColor.BLACK, board));
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("TooManyPlayersError");
    });

    it("players joining the game need to be of different colors", function () {
        let board = new Board();
        let game = new ChessMeGame(board);
        game.join(new Player(PlayerColor.WHITE, board));

        let error = new Error();
        try {
            game.join(new Player(PlayerColor.WHITE, board));
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("SamePlayerTeamError");
    });
});