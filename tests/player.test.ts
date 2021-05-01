import {expect} from "chai";
import {describe, it} from "mocha";
import {Player, PlayerColor} from "../src/Player";
import {Move} from "../src/Move";
import {Col, Position, Location, Row} from "../src/Position";

describe("player commands", function () {
    it("new players have no moves made", function () {
        let player = new Player("p1", PlayerColor.WHITE);
        expect(player.moves.length).equals(0);
    });

    it("players can receive moves", function () {
        let player = new Player("p1", PlayerColor.WHITE);
        let move = new Move(Location.from(Row.ONE, Col.A), Location.from(Row.TWO, Col.A));
        player.addMove(move);
        expect(player.moves.length).equals(1);
    });
});