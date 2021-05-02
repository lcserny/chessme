import {assert} from "chai";
import {describe, it} from "mocha";
import {Board} from "../src/Board";
import {Move} from "../src/Move";
import {Col, Location, Row} from "../src/Position";
import {assertError} from "./common.test";

describe("pawn outcome scenarios", function () {
    it("pawn can first time only move 2 locations up", function () {
        let board = new Board();
        let outcome = board.calculateOutcome(new Move(Location.from(Row.TWO, Col.B), Location.from(Row.FOUR, Col.B)));
        assert.notEqual(outcome, null)
    });

    it("pawn cannot move 2 locations up after first move", function () {
        let board = new Board();

        board.calculateOutcome(new Move(Location.from(Row.TWO, Col.B), Location.from(Row.THREE, Col.B)));
        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Move(Location.from(Row.THREE, Col.B), Location.from(Row.FIVE, Col.B)));
        });
    });

    it("pawn can move 1 location up", function () {
        let board = new Board();

        let outcome1 = board.calculateOutcome(new Move(Location.from(Row.TWO, Col.B), Location.from(Row.THREE, Col.B)));
        let outcome2 = board.calculateOutcome(new Move(Location.from(Row.THREE, Col.B), Location.from(Row.FOUR, Col.B)));

        assert.notEqual(outcome1, null)
        assert.notEqual(outcome2, null)
    });

    it("pawn cannot move 1 location up if enemy occupies square", function () {
        let board = new Board();

        board.positions.move(Location.from(Row.TWO, Col.B), Location.from(Row.SIX, Col.B))

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Move(Location.from(Row.SIX, Col.B), Location.from(Row.SEVEN, Col.B)));
        });
    });

    it("pawn moves 1 location over enemy and defeats it", function () {
        let board = new Board();

        let initialDefeatedPieces = board.defeatedPieces.length;
        let defeatedPiece = board.positions.getPosition(Location.from(Row.SEVEN, Col.A)).piece;

        board.positions.move(Location.from(Row.TWO, Col.B), Location.from(Row.SIX, Col.B))
        let outcome = board.calculateOutcome(new Move(Location.from(Row.SIX, Col.B), Location.from(Row.SEVEN, Col.A)));

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

        board.calculateOutcome(new Move(Location.from(Row.FOUR, Col.D), Location.from(Row.SIX, Col.D)));
        board.calculateOutcome(new Move(Location.from(Row.SIX, Col.D), Location.from(Row.THREE, Col.D)));

        assertError("IllegalMoveError", function () {
            board.calculateOutcome(new Move(Location.from(Row.THREE, Col.D), Location.from(Row.SEVEN, Col.D)));
        });
    });

    it("queen can be moved any number of unoccupied squares in a straight line horizontally", function () {
        let board = new Board();

    });

    it("queen can be moved any number of unoccupied squares in a straight line diagonally", function () {
        let board = new Board();

    });

    it("if enemy piece in its path, the queen stop there and captures it", function () {
        let board = new Board();

    });
});