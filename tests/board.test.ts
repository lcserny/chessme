import {expect} from "chai";
import {describe, it} from "mocha";
import {Board} from "../src/Board";

describe("board setup", function () {
    it("new boards initialize positions", function () {
        let board = new Board();
        let positions = board.positions;

        // TODO: default chess positions set correctly
    });
});