import {expect} from "chai";
import {describe, it} from "mocha";
import {Player, PlayerColor} from "../src/Player";

describe("payer commands", function () {
    it("new players have no moves made", function () {
        let player = new Player("p1", PlayerColor.WHITE);
        expect(player.moves.length).equals(0);
    });
});