import {assert, expect} from "chai";
import {describe, it} from "mocha";
import {Board} from "../src/Board";
import {Move} from "../src/Move";
import {Col, Position, Location, Row} from "../src/Position";

describe("pawn outcome scenarios", function () {
    it("pawn can first time only move 2 locations up", function () {
        let board = new Board();
        let pawnMove = new Move(Location.from(Row.TWO, Col.B), Location.from(Row.FOUR, Col.B));

        let outcome = board.calculateOutcome(pawnMove);

        assert.notEqual(outcome, null)
    });

    it("pawn cannot move 2 locations up after first move", function () {
        throw new Error("Not implemented");
    });

    it("pawn can move 1 location up", function () {
        throw new Error("Not implemented");
    });

    it("pawn moves 1 location over enemy and defeats it", function () {
        throw new Error("Not implemented");
    });
});