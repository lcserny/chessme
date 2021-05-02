import {assert, expect} from "chai";
import {describe, it} from "mocha";
import {ChessMeGame} from "../src/ChessMeGame";
import {Color, Player} from "../src/Player";
import {Board} from "../src/Board";
import {Move} from "../src/Move";
import {Col, Location, Positions, Row} from "../src/Position";
import {GameStatusError} from "../src/errors";
import {OutcomeEngine} from "../src/OutcomeEngine";
import {Piece} from "../src/Piece";
import {Outcome} from "../src/Outcome";
import {assertError} from "./common.test";

describe("game statuses", function () {
    let board = new Board();
    let players = new Array<Player>();
    players.push(new Player("p1", Color.WHITE))
    players.push(new Player("p2", Color.BLACK))

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

        assertError("GameStatusError", function () {
            game.start();
        });
    });

    it("game can be stopped only once", function () {
        let game = new ChessMeGame(board, players);

        game.start();
        game.stop();

        assertError("GameStatusError", function () {
            game.stop();
        });
    });

    it("game cannot be started without two players", function () {
        let game = new ChessMeGame(board);
        assertError("NoPlayersError", function () {
            game.start();
        });
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
        game.start()

        assertError("PlayerNotInGameError", function () {
            game.move(player3, move);
        });
    });

    it("game executes move for player", function () {
        let player1 = new Player("a", Color.WHITE);
        let player2 = new Player("b", Color.BLACK);
        let game = new ChessMeGame(new Board(new MockOutcomeEngine()), new Array<Player>(player2, player1));
        let move = new Move(Location.from(Row.ONE, Col.A), Location.from(Row.TWO, Col.A));
        game.start();

        let outcome = game.move(player1, move);

        assert.notEqual(outcome, null);
    });

    it("game allows white player to start first move", function () {
        let player1 = new Player("a", Color.WHITE);
        let player2 = new Player("b", Color.BLACK);
        let game = new ChessMeGame(new Board(), new Array<Player>(player1, player2));
        let move = new Move(Location.from(Row.ONE, Col.A), Location.from(Row.TWO, Col.A));
        game.start();

        assertError("PlayerTurnError", function () {
            game.move(player2, move);
        });
    });

    it("game switches player turn allowed after move", function () {
        let player1 = new Player("a", Color.WHITE);
        let player2 = new Player("b", Color.BLACK);
        let game = new ChessMeGame(new Board(new MockOutcomeEngine()), new Array<Player>(player1, player2));
        let move = new Move(Location.from(Row.ONE, Col.A), Location.from(Row.TWO, Col.A));
        game.start();

        game.move(player1, move);

        assertError("PlayerTurnError", function () {
            game.move(player1, move);
        });
    });
});

// TODO: test checked state and check mate

class MockOutcomeEngine implements OutcomeEngine {

    calculateOutcome(positions: Positions, defeatedPieces: Array<Piece>, move: Move): Outcome {
        return new Outcome();
    }
}