import {expect, assert} from "chai";
import {describe, it} from "mocha";
import {Player, PlayerColor} from "../src/Player";
import {Move} from "../src/Move";
import {Position} from "../src/Position";

describe("payer commands", function () {
    it("new players have no moves made", function () {
        let player = new Player(PlayerColor.WHITE);
        expect(player.moves.length).equals(0);
    });

    it("player moves have outcomes", function () {
        let move = new Move(new Position("", ""), new Position("", ""));
        let player = new Player(PlayerColor.WHITE);
        let outcome = player.move(move);

        assert.notEqual(outcome, null);
    });
});