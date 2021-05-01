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

        let oneA = positions.getPosition(Row.ONE, Col.A);
        expect(oneA.piece instanceof Rook && oneA.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let oneB = positions.getPosition(Row.ONE, Col.B);
        expect(oneB.piece instanceof Knight && oneB.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let oneC = positions.getPosition(Row.ONE, Col.C);
        expect(oneC.piece instanceof Bishop && oneC.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let oneD = positions.getPosition(Row.ONE, Col.D);
        expect(oneD.piece instanceof Queen && oneD.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let oneE = positions.getPosition(Row.ONE, Col.E);
        expect(oneE.piece instanceof King && oneE.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let oneF = positions.getPosition(Row.ONE, Col.F);
        expect(oneF.piece instanceof Bishop && oneF.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let oneG = positions.getPosition(Row.ONE, Col.G);
        expect(oneG.piece instanceof Knight && oneG.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let oneH = positions.getPosition(Row.ONE, Col.H);
        expect(oneH.piece instanceof Rook && oneH.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let twoA = positions.getPosition(Row.TWO, Col.A);
        expect(twoA.piece instanceof Pawn && twoA.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let twoB = positions.getPosition(Row.TWO, Col.B);
        expect(twoB.piece instanceof Pawn && twoB.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let twoC = positions.getPosition(Row.TWO, Col.C);
        expect(twoC.piece instanceof Pawn && twoC.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let twoD = positions.getPosition(Row.TWO, Col.D);
        expect(twoD.piece instanceof Pawn && twoD.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let twoE = positions.getPosition(Row.TWO, Col.E);
        expect(twoE.piece instanceof Pawn && twoE.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let twoF = positions.getPosition(Row.TWO, Col.F);
        expect(twoF.piece instanceof Pawn && twoF.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let twoG = positions.getPosition(Row.TWO, Col.G);
        expect(twoG.piece instanceof Pawn && twoG.piece.playerColor == PlayerColor.WHITE).to.be.true;
        let twoH = positions.getPosition(Row.TWO, Col.H);
        expect(twoH.piece instanceof Pawn && twoH.piece.playerColor == PlayerColor.WHITE).to.be.true;

        let eightA = positions.getPosition(Row.EIGHT, Col.A);
        expect(eightA.piece instanceof Rook && eightA.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let eightB = positions.getPosition(Row.EIGHT, Col.B);
        expect(eightB.piece instanceof Knight && eightB.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let eightC = positions.getPosition(Row.EIGHT, Col.C);
        expect(eightC.piece instanceof Bishop && eightC.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let eightD = positions.getPosition(Row.EIGHT, Col.D);
        expect(eightD.piece instanceof Queen && eightD.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let eightE = positions.getPosition(Row.EIGHT, Col.E);
        expect(eightE.piece instanceof King && eightE.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let eightF = positions.getPosition(Row.EIGHT, Col.F);
        expect(eightF.piece instanceof Bishop && eightF.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let eightG = positions.getPosition(Row.EIGHT, Col.G);
        expect(eightG.piece instanceof Knight && eightG.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let eightH = positions.getPosition(Row.EIGHT, Col.H);
        expect(eightH.piece instanceof Rook && eightH.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenA = positions.getPosition(Row.SEVEN, Col.A);
        expect(sevenA.piece instanceof Pawn && sevenA.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenB = positions.getPosition(Row.SEVEN, Col.B);
        expect(sevenB.piece instanceof Pawn && sevenB.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenC = positions.getPosition(Row.SEVEN, Col.C);
        expect(sevenC.piece instanceof Pawn && sevenC.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenD = positions.getPosition(Row.SEVEN, Col.D);
        expect(sevenD.piece instanceof Pawn && sevenD.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenE = positions.getPosition(Row.SEVEN, Col.E);
        expect(sevenE.piece instanceof Pawn && sevenE.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenF = positions.getPosition(Row.SEVEN, Col.F);
        expect(sevenF.piece instanceof Pawn && sevenF.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenG = positions.getPosition(Row.SEVEN, Col.G);
        expect(sevenG.piece instanceof Pawn && sevenG.piece.playerColor == PlayerColor.BLACK).to.be.true;
        let sevenH = positions.getPosition(Row.SEVEN, Col.H);
        expect(sevenH.piece instanceof Pawn && sevenH.piece.playerColor == PlayerColor.BLACK).to.be.true;
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

    it("board is updated with defeated piece after move", function () {
        let outEng = new MockOutcomeEngine();
        let board = new Board(outEng);
        let initialPositionsLength = board.positions.length();
        board.calculateOutcome(new MockMove());

        expect(board.defeatedPieces.length).equals(1);
        expect(board.positions.length()).equals(initialPositionsLength - 1);
    });
});

class MockOutcomeEngine implements OutcomeEngine {

    calculateOutcomeCalled = 0;
    moveAllowedCalled = 0;

    calculateOutcome(positions: Positions, defeatedPieces: Array<Piece>, move: Move): Outcome {
        this.calculateOutcomeCalled++;
        let outcome = new Outcome();
        outcome.defeatedPosition = positions.getPosition(Row.ONE, Col.A);
        return outcome;
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