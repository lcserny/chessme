import {expect} from "chai";
import {describe, it} from "mocha";
import {Board} from "../src/Board";
import {Col, Positions, Row} from "../src/Position";
import {Pawn} from "../src/Pawn";
import {Rook} from "../src/Rook";
import {Knight} from "../src/Knight";
import {Bishop} from "../src/Bishop";
import {King} from "../src/King";
import {Queen} from "../src/Queen";
import {PlayerColor} from "../src/Player";
import {OutcomeEngine} from "../src/OutcomeEngine";
import {Piece} from "../src/Piece";
import {Move} from "../src/Move";
import {Outcome} from "../src/Outcome";

describe("board setup", function () {
    it("new boards initialize positions", function () {
        let board = new Board();
        let positions = board.positions;

        let oneA = positions.getPiece(Row.ONE, Col.A);
        expect(oneA instanceof Rook && oneA.playerColor == PlayerColor.WHITE).to.be.true;
        let oneB = positions.getPiece(Row.ONE, Col.B);
        expect(oneB instanceof Knight && oneB.playerColor == PlayerColor.WHITE).to.be.true;
        let oneC = positions.getPiece(Row.ONE, Col.C);
        expect(oneC instanceof Bishop && oneC.playerColor == PlayerColor.WHITE).to.be.true;
        let oneD = positions.getPiece(Row.ONE, Col.D);
        expect(oneD instanceof Queen && oneD.playerColor == PlayerColor.WHITE).to.be.true;
        let oneE = positions.getPiece(Row.ONE, Col.E);
        expect(oneE instanceof King && oneE.playerColor == PlayerColor.WHITE).to.be.true;
        let oneF = positions.getPiece(Row.ONE, Col.F);
        expect(oneF instanceof Bishop && oneF.playerColor == PlayerColor.WHITE).to.be.true;
        let oneG = positions.getPiece(Row.ONE, Col.G);
        expect(oneG instanceof Knight && oneG.playerColor == PlayerColor.WHITE).to.be.true;
        let oneH = positions.getPiece(Row.ONE, Col.H);
        expect(oneH instanceof Rook && oneH.playerColor == PlayerColor.WHITE).to.be.true;
        let twoA = positions.getPiece(Row.TWO, Col.A);
        expect(twoA instanceof Pawn && twoA.playerColor == PlayerColor.WHITE).to.be.true;
        let twoB = positions.getPiece(Row.TWO, Col.B);
        expect(twoB instanceof Pawn && twoB.playerColor == PlayerColor.WHITE).to.be.true;
        let twoC = positions.getPiece(Row.TWO, Col.C);
        expect(twoC instanceof Pawn && twoC.playerColor == PlayerColor.WHITE).to.be.true;
        let twoD = positions.getPiece(Row.TWO, Col.D);
        expect(twoD instanceof Pawn && twoD.playerColor == PlayerColor.WHITE).to.be.true;
        let twoE = positions.getPiece(Row.TWO, Col.E);
        expect(twoE instanceof Pawn && twoE.playerColor == PlayerColor.WHITE).to.be.true;
        let twoF = positions.getPiece(Row.TWO, Col.F);
        expect(twoF instanceof Pawn && twoF.playerColor == PlayerColor.WHITE).to.be.true;
        let twoG = positions.getPiece(Row.TWO, Col.G);
        expect(twoG instanceof Pawn && twoG.playerColor == PlayerColor.WHITE).to.be.true;
        let twoH = positions.getPiece(Row.TWO, Col.H);
        expect(twoH instanceof Pawn && twoH.playerColor == PlayerColor.WHITE).to.be.true;

        let eightA = positions.getPiece(Row.EIGHT, Col.A);
        expect(eightA instanceof Rook && eightA.playerColor == PlayerColor.BLACK).to.be.true;
        let eightB = positions.getPiece(Row.EIGHT, Col.B);
        expect(eightB instanceof Knight && eightB.playerColor == PlayerColor.BLACK).to.be.true;
        let eightC = positions.getPiece(Row.EIGHT, Col.C);
        expect(eightC instanceof Bishop && eightC.playerColor == PlayerColor.BLACK).to.be.true;
        let eightD = positions.getPiece(Row.EIGHT, Col.D);
        expect(eightD instanceof Queen && eightD.playerColor == PlayerColor.BLACK).to.be.true;
        let eightE = positions.getPiece(Row.EIGHT, Col.E);
        expect(eightE instanceof King && eightE.playerColor == PlayerColor.BLACK).to.be.true;
        let eightF = positions.getPiece(Row.EIGHT, Col.F);
        expect(eightF instanceof Bishop && eightF.playerColor == PlayerColor.BLACK).to.be.true;
        let eightG = positions.getPiece(Row.EIGHT, Col.G);
        expect(eightG instanceof Knight && eightG.playerColor == PlayerColor.BLACK).to.be.true;
        let eightH = positions.getPiece(Row.EIGHT, Col.H);
        expect(eightH instanceof Rook && eightH.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenA = positions.getPiece(Row.SEVEN, Col.A);
        expect(sevenA instanceof Pawn && sevenA.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenB = positions.getPiece(Row.SEVEN, Col.B);
        expect(sevenB instanceof Pawn && sevenB.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenC = positions.getPiece(Row.SEVEN, Col.C);
        expect(sevenC instanceof Pawn && sevenC.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenD = positions.getPiece(Row.SEVEN, Col.D);
        expect(sevenD instanceof Pawn && sevenD.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenE = positions.getPiece(Row.SEVEN, Col.E);
        expect(sevenE instanceof Pawn && sevenE.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenF = positions.getPiece(Row.SEVEN, Col.F);
        expect(sevenF instanceof Pawn && sevenF.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenG = positions.getPiece(Row.SEVEN, Col.G);
        expect(sevenG instanceof Pawn && sevenG.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenH = positions.getPiece(Row.SEVEN, Col.H);
        expect(sevenH instanceof Pawn && sevenH.playerColor == PlayerColor.BLACK).to.be.true;
    });

    it("new boards don't have any defeated pieces", function () {
        let board = new Board();
        let defeatedPieces = board.defeatedPieces;

        expect(defeatedPieces.length).equals(0);
    });

    it("boards delegate moveAllowed to outcomeEngine", function () {
        let outEng = new MockOutcomeEngine();
        let board = new Board(outEng);
        board.isMoveAllowed(new MockMove());

        expect(outEng.moveAllowedCalled).equals(1);
    });

    it("boards delegate calculateOutcome to outcomeEngine", function () {
        let outEng = new MockOutcomeEngine();
        let board = new Board(outEng);
        board.calculateOutcome(new MockMove());

        expect(outEng.calculateOutcomeCalled).equals(1);
    });
});

class MockOutcomeEngine implements OutcomeEngine {

    calculateOutcomeCalled = 0;
    moveAllowedCalled = 0;

    calculateOutcome(positions: Positions, defeatedPieces: Array<Piece>, move: Move): Outcome {
        this.calculateOutcomeCalled++;
        return null;
    }

    isMoveAllowed(move: Move): boolean {
        this.moveAllowedCalled++;
        return true;
    }
}

class MockMove extends Move {

    constructor() {
        super(null, null);
    }
}