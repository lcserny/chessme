import {assert, expect} from "chai";
import {describe, it} from "mocha";
import {Player, PlayerColor} from "../src/Player";
import {Move} from "../src/Move";
import {Col, Position, Row} from "../src/Position";
import {Board} from "../src/Board";

describe("payer commands", function () {
    it("new players have no moves made", function () {
        let board = new Board();
        let player = new Player(PlayerColor.WHITE, board);
        expect(player.moves.length).equals(0);
    });

    it("player moves have outcomes", function () {
        let board = new Board();
        let move = new Move(new Position(Row.ONE, Col.A), new Position(Row.TWO, Col.B));
        let player = new Player(PlayerColor.WHITE, board);
        let outcome = player.move(move);

        assert.notEqual(outcome, null);
    });
});