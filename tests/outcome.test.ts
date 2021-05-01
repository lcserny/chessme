import {assert, expect} from "chai";
import {describe, it} from "mocha";
import {Board} from "../src/Board";
import {Move} from "../src/Move";
import {Col, Position, Location, Row} from "../src/Position";

describe("pawn outcome scenarios", function () {
    it("pawn cannot move 2 locations", function () {
        let board = new Board();
        let pawnMove = new Move(Location.from(Row.TWO, Col.B), Location.from(Row.FOUR, Col.B));

        let err = new Error();
        try {
            board.calculateOutcome(pawnMove);
        } catch (e) {
            err = e;
        }
        expect(err.name).equals("IllegalMoveError");
    });

    it("pawn can move 1 location", function () {
        // TODO
    });

    it("pawn moves 1 location over enemy and defeats it", function () {
        // TODO
    });
});