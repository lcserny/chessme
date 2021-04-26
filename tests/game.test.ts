import {expect} from "chai";
import {describe, it} from "mocha";
import {ChessMeGame} from "../src/ChessMeGame";
import {Player, PlayerColor} from "../src/Player";

describe("game statuses", function () {
    let players = new Array<Player>();
    players.push(new Player(PlayerColor.WHITE))
    players.push(new Player(PlayerColor.BLACK))

    it("new games have pending status", function () {
        let game = new ChessMeGame();
        expect(game.status()).contains("pending");
    });

    it("game can be started", function () {
        let game = new ChessMeGame(players);

        game.start();

        expect(game.status()).contains("start");
    });

    it("game can be stopped", function () {
        let game = new ChessMeGame(players);

        game.start();
        game.stop();

        expect(game.status()).contains("stop");
    });

    it("game can be started only once", function () {
        let game = new ChessMeGame(players);

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
        let game = new ChessMeGame(players);

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
        let game = new ChessMeGame();
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
        let game = new ChessMeGame();
        game.join(new Player(PlayerColor.BLACK));
        game.join(new Player(PlayerColor.WHITE));

        let error = new Error();
        try {
            game.join(new Player(PlayerColor.BLACK));
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("TooManyPlayersError");
    });

    it("players joining the game need to be of different colors", function () {
        let game = new ChessMeGame();
        game.join(new Player(PlayerColor.WHITE));

        let error = new Error();
        try {
            game.join(new Player(PlayerColor.WHITE));
        } catch (e) {
            error = e;
        }
        expect(error.name).equals("SamePlayerTeamError");
    });
});