import {assert, expect} from "chai";
import {describe, it} from "mocha";
import {Board} from "../src/Board";
import {Move} from "../src/Move";
import {Col, Location, Row} from "../src/Position";
import {assertError, getTwoPlayers} from "./common.test";
import {Pawn} from "../src/Pawn";
import {Knight} from "../src/Knight";
import {Bishop} from "../src/Bishop";
import {Rook} from "../src/Rook";
import {Queen} from "../src/Queen";
import {King} from "../src/King";
import {ChessMeGame} from "../src/ChessMeGame";
import {Color, Player} from "../src/Player";

describe("pawn outcome scenarios", function () {
    it("pawn can first time only move 2 locations up", function () {
        let board = new Board();
        let outcome = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.TWO, Col.B), Location.from(Row.FOUR, Col.B)));
        assert.notEqual(outcome, null)
    });

    it("pawn cannot move 2 locations up after first move", function () {
        let board = new Board();

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.TWO, Col.B), Location.from(Row.THREE, Col.B)));
        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.B), Location.from(Row.FIVE, Col.B)));
        });
    });

    it("pawn can move 1 location up", function () {
        let board = new Board();

        let outcome1 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.TWO, Col.B), Location.from(Row.THREE, Col.B)));
        let outcome2 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.B), Location.from(Row.FOUR, Col.B)));

        assert.notEqual(outcome1, null)
        assert.notEqual(outcome2, null)
    });

    it("pawn cannot move 1 location up if enemy occupies square", function () {
        let board = new Board();

        board.positions.move(Location.from(Row.TWO, Col.B), Location.from(Row.SIX, Col.B))

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.SIX, Col.B), Location.from(Row.SEVEN, Col.B)));
        });
    });

    it("pawn moves 1 location over enemy and defeats it", function () {
        let board = new Board();

        let initialDefeatedPieces = board.defeatedPieces.length;
        let defeatedPiece = board.positions.getPosition(Location.from(Row.SEVEN, Col.A)).piece;

        board.positions.move(Location.from(Row.TWO, Col.B), Location.from(Row.SIX, Col.B))
        let outcome = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.SIX, Col.B), Location.from(Row.SEVEN, Col.A)));

        assert.equal(board.defeatedPieces.length, initialDefeatedPieces + 1);
        assert.equal(outcome.defeatedPosition.piece, defeatedPiece);
    });
});

describe("queen outcome scenarios", function () {
    it("queen can be moved any number of unoccupied squares in a straight line vertically", function () {
        let board = new Board();
        board.positions.removePosition(board.positions.getPosition(Location.from(Row.SEVEN, Col.D)));
        board.positions.move(Location.from(Row.TWO, Col.D), Location.from(Row.SEVEN, Col.D));
        board.positions.move(Location.from(Row.ONE, Col.D), Location.from(Row.FOUR, Col.D));

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.SIX, Col.D)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.SIX, Col.D), Location.from(Row.THREE, Col.D)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.D), Location.from(Row.SEVEN, Col.D)));
        });
    });

    it("queen can be moved any number of unoccupied squares in a straight line horizontally", function () {
        let board = new Board();
        board.positions.move(Location.from(Row.SEVEN, Col.D), Location.from(Row.FOUR, Col.A));
        board.positions.move(Location.from(Row.TWO, Col.D), Location.from(Row.FOUR, Col.H));
        board.positions.move(Location.from(Row.ONE, Col.D), Location.from(Row.FOUR, Col.D));

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.FOUR, Col.A)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.A), Location.from(Row.FOUR, Col.G)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.G), Location.from(Row.FOUR, Col.H)));
        });
    });

    it("queen can be moved any number of unoccupied squares in a straight line diagonally", function () {
        let board = new Board();
        board.positions.move(Location.from(Row.SEVEN, Col.B), Location.from(Row.SIX, Col.B));
        board.positions.move(Location.from(Row.ONE, Col.D), Location.from(Row.FOUR, Col.D));

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.THREE, Col.E)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.E), Location.from(Row.SIX, Col.B)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.SIX, Col.B), Location.from(Row.FOUR, Col.D)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.TWO, Col.B)));
        });
    });

    it("if enemy piece in its path, the queen stop there and captures it", function () {
        let board = new Board();
        board.positions.move(Location.from(Row.ONE, Col.D), Location.from(Row.FOUR, Col.D));
        board.positions.move(Location.from(Row.EIGHT, Col.B), Location.from(Row.FIVE, Col.B));
        board.positions.move(Location.from(Row.EIGHT, Col.F), Location.from(Row.FIVE, Col.F));

        let initialSize = board.defeatedPieces.length;

        let out1 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.SEVEN, Col.D)));
        let out2 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.SEVEN, Col.D), Location.from(Row.FIVE, Col.B)));
        let out3 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FIVE, Col.B), Location.from(Row.FIVE, Col.F)));

        assert.equal(board.defeatedPieces.length, initialSize + 3);
        expect(out1.defeatedPosition.piece instanceof Pawn).to.be.true;
        expect(out2.defeatedPosition.piece instanceof Knight).to.be.true;
        expect(out3.defeatedPosition.piece instanceof Bishop).to.be.true;
    });
});

describe("rook outcome scenarios", function () {
    it("rook can be moved any number of unoccupied squares in a straight line vertically", function () {
        let board = new Board();
        board.positions.removePosition(board.positions.getPosition(Location.from(Row.SEVEN, Col.D)));
        board.positions.move(Location.from(Row.TWO, Col.D), Location.from(Row.SEVEN, Col.D));
        board.positions.move(Location.from(Row.ONE, Col.A), Location.from(Row.FOUR, Col.D));

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.SIX, Col.D)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.SIX, Col.D), Location.from(Row.THREE, Col.D)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.D), Location.from(Row.SEVEN, Col.D)));
        });
    });

    it("rook can be moved any number of unoccupied squares in a straight line horizontally", function () {
        let board = new Board();
        board.positions.move(Location.from(Row.SEVEN, Col.D), Location.from(Row.FOUR, Col.A));
        board.positions.move(Location.from(Row.TWO, Col.D), Location.from(Row.FOUR, Col.H));
        board.positions.move(Location.from(Row.ONE, Col.A), Location.from(Row.FOUR, Col.D));

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.FOUR, Col.A)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.A), Location.from(Row.FOUR, Col.G)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.G), Location.from(Row.FOUR, Col.H)));
        });
    });

    it("if enemy piece in its path, the rook stop there and captures it", function () {
        let board = new Board();
        board.positions.move(Location.from(Row.ONE, Col.A), Location.from(Row.FOUR, Col.D));

        let initialSize = board.defeatedPieces.length;

        let out1 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.SEVEN, Col.D)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.SEVEN, Col.D), Location.from(Row.FOUR, Col.D)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.FOUR, Col.B)));
        let out2 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.B), Location.from(Row.SEVEN, Col.B)));
        let out3 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.SEVEN, Col.B), Location.from(Row.EIGHT, Col.B)));

        assert.equal(board.defeatedPieces.length, initialSize + 3);
        expect(out1.defeatedPosition.piece instanceof Pawn).to.be.true;
        expect(out2.defeatedPosition.piece instanceof Pawn).to.be.true;
        expect(out3.defeatedPosition.piece instanceof Knight).to.be.true;
    });
});

describe("bishop outcome scenarios", function () {
    it("bishop can be moved any number of unoccupied squares in a straight line diagonally", function () {
        let board = new Board();
        board.positions.move(Location.from(Row.SEVEN, Col.B), Location.from(Row.SIX, Col.B));
        board.positions.move(Location.from(Row.ONE, Col.C), Location.from(Row.FOUR, Col.D));

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.THREE, Col.E)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.E), Location.from(Row.SIX, Col.B)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.SIX, Col.B), Location.from(Row.FOUR, Col.D)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.TWO, Col.B)));
        });
    });

    it("if enemy piece in its path, the bishop stop there and captures it", function () {
        let board = new Board();
        board.positions.removePosition(board.positions.getPosition(Location.from(Row.SEVEN, Col.G)));
        board.positions.move(Location.from(Row.ONE, Col.C), Location.from(Row.FOUR, Col.D));

        let initialSize = board.defeatedPieces.length;

        let out1 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.SEVEN, Col.A)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.SEVEN, Col.A), Location.from(Row.FOUR, Col.D)));
        let out2 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.EIGHT, Col.H)));

        assert.equal(board.defeatedPieces.length, initialSize + 2);
        expect(out1.defeatedPosition.piece instanceof Pawn).to.be.true;
        expect(out2.defeatedPosition.piece instanceof Rook).to.be.true;
    });
});

describe("king outcome scenarios", function () {
    it("king can be moved one unoccupied square vertically", function () {
        let board = new Board();
        board.positions.move(Location.from(Row.SEVEN, Col.E), Location.from(Row.FIVE, Col.E));
        board.positions.move(Location.from(Row.TWO, Col.E), Location.from(Row.THREE, Col.E));
        board.positions.move(Location.from(Row.ONE, Col.E), Location.from(Row.FOUR, Col.E));

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.FIVE, Col.E)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FIVE, Col.E), Location.from(Row.FOUR, Col.E)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.THREE, Col.E)));
        });

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.FIVE, Col.E)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FIVE, Col.E), Location.from(Row.THREE, Col.E)));
        });
    });

    it("king can be moved one unoccupied square horizontally", function () {
        let board = new Board();
        board.positions.move(Location.from(Row.SEVEN, Col.E), Location.from(Row.FOUR, Col.D));
        board.positions.move(Location.from(Row.TWO, Col.E), Location.from(Row.FOUR, Col.F));
        board.positions.move(Location.from(Row.ONE, Col.E), Location.from(Row.FOUR, Col.E));

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.FOUR, Col.D)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.FOUR, Col.E)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.FOUR, Col.F)));
        });

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.FOUR, Col.D)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.FOUR, Col.F)));
        });
    });

    it("king can be moved one unoccupied square diagonally", function () {
        let board = new Board();
        board.positions.move(Location.from(Row.ONE, Col.E), Location.from(Row.FOUR, Col.E));
        board.positions.move(Location.from(Row.SEVEN, Col.C), Location.from(Row.FIVE, Col.D));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.TWO, Col.C)));
        });

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.FIVE, Col.D)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FIVE, Col.D), Location.from(Row.SEVEN, Col.F)));
        });
    });

    it("if enemy piece in its path, the king stop there and captures it", function () {
        let board = new Board();
        board.positions.move(Location.from(Row.ONE, Col.E), Location.from(Row.FOUR, Col.E));
        board.positions.move(Location.from(Row.EIGHT, Col.D), Location.from(Row.FIVE, Col.D));

        let initialSize = board.defeatedPieces.length;

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.TWO, Col.C)));
        });

        let out1 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.FIVE, Col.D)));

        assert.equal(board.defeatedPieces.length, initialSize + 1);
        expect(out1.defeatedPosition.piece instanceof Queen).to.be.true;
    });
});

describe("knight outcome scenarios", function () {
    it("knight can be moved in L shapes only, if square not occupied and board allows", function () {
        let board = new Board();

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.ONE, Col.B), Location.from(Row.THREE, Col.C)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.C), Location.from(Row.TWO, Col.E)));
        });

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.C), Location.from(Row.THREE, Col.B)));
        });

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.C), Location.from(Row.FOUR, Col.B)));
        });

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.C), Location.from(Row.TWO, Col.E)));
        });

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.C), Location.from(Row.FOUR, Col.A)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.A), Location.from(Row.TWO, Col.B)));
        });

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FOUR, Col.A), Location.from(Row.SIX, Col.B)));
    });

    it("if enemy piece in its target location, the knight captures it", function () {
        let board = new Board();
        let initialSize = board.defeatedPieces.length;

        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.ONE, Col.B), Location.from(Row.THREE, Col.C)));
        board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.THREE, Col.C), Location.from(Row.FIVE, Col.B)));
        let out1 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.FIVE, Col.B), Location.from(Row.SEVEN, Col.C)));
        let out2 = board.calculateOutcome(new Player("p1", Color.WHITE), new Move(Location.from(Row.SEVEN, Col.C), Location.from(Row.EIGHT, Col.E)));

        assert.equal(board.defeatedPieces.length, initialSize + 2);
        expect(out1.defeatedPosition.piece instanceof Pawn).to.be.true;
        expect(out2.defeatedPosition.piece instanceof King).to.be.true;
    });
});

describe("check scenarios", function () {
    it("simple, white queen check's black king", function () {
        let players = getTwoPlayers();
        let firstPlayer = players[0];
        let secondPlayer = players[1];
        let board = new Board();
        let game = new ChessMeGame(board, players);

        board.positions.removePosition(board.positions.getPosition(Location.from(Row.TWO, Col.D)));

        let out1 = game.move(firstPlayer, new Move(Location.from(Row.ONE, Col.D), Location.from(Row.FOUR, Col.D)));
        expect(out1.check).to.be.false;
        assert.equal(out1.winningPlayer, null);

        game.move(secondPlayer, new Move(Location.from(Row.SEVEN, Col.E), Location.from(Row.SIX, Col.E)));

        let out2 = game.move(firstPlayer, new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.FOUR, Col.E)));
        expect(out2.check).to.be.false;
        assert.equal(out2.winningPlayer, null);

        game.move(secondPlayer, new Move(Location.from(Row.SIX, Col.E), Location.from(Row.FIVE, Col.E)));

        let out3 = game.move(firstPlayer, new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.FIVE, Col.E)));
        expect(out3.check).to.be.true;
        expect(out3.winningPlayer.name).equals(firstPlayer.name);
    });

    it("simple, white knight check's black king", function () {
        let players = getTwoPlayers();
        let firstPlayer = players[0];
        let secondPlayer = players[1];
        let board = new Board();
        let game = new ChessMeGame(board, players);

        let out1 = game.move(firstPlayer, new Move(Location.from(Row.ONE, Col.B), Location.from(Row.THREE, Col.C)));
        expect(out1.check).to.be.false;
        assert.equal(out1.winningPlayer, null);

        game.move(secondPlayer, new Move(Location.from(Row.SEVEN, Col.E), Location.from(Row.SIX, Col.E)));

        let out2 = game.move(firstPlayer, new Move(Location.from(Row.THREE, Col.C), Location.from(Row.FIVE, Col.B)));
        expect(out2.check).to.be.false;
        assert.equal(out2.winningPlayer, null);

        game.move(secondPlayer, new Move(Location.from(Row.SIX, Col.E), Location.from(Row.FIVE, Col.E)));

        let out3 = game.move(firstPlayer, new Move(Location.from(Row.FIVE, Col.B), Location.from(Row.SIX, Col.D)));
        expect(out3.check).to.be.true;
        expect(out3.winningPlayer.name).equals(firstPlayer.name);
    });

    it("simple, white bishop check's black king", function () {
        let players = getTwoPlayers();
        let firstPlayer = players[0];
        let secondPlayer = players[1];
        let board = new Board();
        let game = new ChessMeGame(board, players);

        board.positions.removePosition(board.positions.getPosition(Location.from(Row.TWO, Col.E)));

        let out1 = game.move(firstPlayer, new Move(Location.from(Row.ONE, Col.F), Location.from(Row.FIVE, Col.B)));
        expect(out1.check).to.be.false;
        assert.equal(out1.winningPlayer, null);

        let out2 = game.move(secondPlayer, new Move(Location.from(Row.SEVEN, Col.D), Location.from(Row.SIX, Col.D)));
        expect(out2.check).to.be.true;
        expect(out2.winningPlayer.name).equals(firstPlayer.name);
    });

    it("complex, white queen check's black king, then black bishop defends", function () {
        let players = getTwoPlayers();
        let firstPlayer = players[0];
        let secondPlayer = players[1];
        let board = new Board();
        let game = new ChessMeGame(board, players);

        board.positions.removePosition(board.positions.getPosition(Location.from(Row.TWO, Col.D)));

        let out1 = game.move(firstPlayer, new Move(Location.from(Row.ONE, Col.D), Location.from(Row.FOUR, Col.D)));
        expect(out1.check).to.be.false;
        assert.equal(out1.winningPlayer, null);

        game.move(secondPlayer, new Move(Location.from(Row.SEVEN, Col.E), Location.from(Row.SIX, Col.E)));

        let out2 = game.move(firstPlayer, new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.FOUR, Col.E)));
        expect(out2.check).to.be.false;
        assert.equal(out2.winningPlayer, null);

        game.move(secondPlayer, new Move(Location.from(Row.SIX, Col.E), Location.from(Row.FIVE, Col.E)));

        let out3 = game.move(firstPlayer, new Move(Location.from(Row.FOUR, Col.E), Location.from(Row.FIVE, Col.E)));
        expect(out3.check).to.be.true;
        expect(out3.winningPlayer.name).equals(firstPlayer.name);

        let out4 = game.move(secondPlayer, new Move(Location.from(Row.EIGHT, Col.F), Location.from(Row.SEVEN, Col.E)));
        expect(out4.check).to.be.false;
        assert.equal(out4.winningPlayer, null);
    });
});