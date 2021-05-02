import {assert} from "chai";
import {describe, it} from "mocha";
import {Board} from "../src/Board";
import {Move} from "../src/Move";
import {Col, Location, Row} from "../src/Position";

describe("pawn outcome scenarios", function () {
    it("pawn can first time only move 2 locations up", function () {
        let board = new Board();
        let outcome = board.calculateOutcome(new Move(Location.from(Row.TWO, Col.B), Location.from(Row.FOUR, Col.B)));
        assert.notEqual(outcome, null)
    });

    it("pawn cannot move 2 locations up after first move", function () {
        let board = new Board();

        board.calculateOutcome(new Move(Location.from(Row.TWO, Col.B), Location.from(Row.THREE, Col.B)));
        let err = new Error();
        try {
            board.calculateOutcome(new Move(Location.from(Row.THREE, Col.B), Location.from(Row.FIVE, Col.B)));
        } catch (e) {
            err = e;
        }

        assert.equal(err.name, "IllegalMoveError")
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
        let err = new Error();
        try {
            board.calculateOutcome(new Move(Location.from(Row.SIX, Col.B), Location.from(Row.SEVEN, Col.B)));
        } catch (e) {
            err = e;
        }

        assert.equal(err.name, "IllegalMoveError")
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
    it("", function () {
        let board = new Board();

    });
});