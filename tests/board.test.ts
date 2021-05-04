import {assert, expect} from "chai";
import {describe, it} from "mocha";
import {Board} from "../src/Board";
import {Col, Location, Row} from "../src/Position";
import {Pawn} from "../src/Pawn";
import {Rook} from "../src/Rook";
import {Knight} from "../src/Knight";
import {Bishop} from "../src/Bishop";
import {King} from "../src/King";
import {Queen} from "../src/Queen";
import {Color} from "../src/Player";
import {SimpleOutcomeEngine} from "../src/OutcomeEngine";
import {Move} from "../src/Move";
import {getTwoPlayers, OutcomeEngineSpy} from "./common.test";
import {ChessMeGame} from "../src/ChessMeGame";

describe("board setup", function () {
    it("new boards initialize positions", function () {
        let board = new Board();
        let positions = board.positions;

        let oneA = positions.getPosition(Location.from(Row.ONE, Col.A));
        expect(oneA.piece instanceof Rook && oneA.piece.color == Color.WHITE).to.be.true;
        let oneB = positions.getPosition(Location.from(Row.ONE, Col.B));
        expect(oneB.piece instanceof Knight && oneB.piece.color == Color.WHITE).to.be.true;
        let oneC = positions.getPosition(Location.from(Row.ONE, Col.C));
        expect(oneC.piece instanceof Bishop && oneC.piece.color == Color.WHITE).to.be.true;
        let oneD = positions.getPosition(Location.from(Row.ONE, Col.D));
        expect(oneD.piece instanceof Queen && oneD.piece.color == Color.WHITE).to.be.true;
        let oneE = positions.getPosition(Location.from(Row.ONE, Col.E));
        expect(oneE.piece instanceof King && oneE.piece.color == Color.WHITE).to.be.true;
        let oneF = positions.getPosition(Location.from(Row.ONE, Col.F));
        expect(oneF.piece instanceof Bishop && oneF.piece.color == Color.WHITE).to.be.true;
        let oneG = positions.getPosition(Location.from(Row.ONE, Col.G));
        expect(oneG.piece instanceof Knight && oneG.piece.color == Color.WHITE).to.be.true;
        let oneH = positions.getPosition(Location.from(Row.ONE, Col.H));
        expect(oneH.piece instanceof Rook && oneH.piece.color == Color.WHITE).to.be.true;
        let twoA = positions.getPosition(Location.from(Row.TWO, Col.A));
        expect(twoA.piece instanceof Pawn && twoA.piece.color == Color.WHITE).to.be.true;
        let twoB = positions.getPosition(Location.from(Row.TWO, Col.B));
        expect(twoB.piece instanceof Pawn && twoB.piece.color == Color.WHITE).to.be.true;
        let twoC = positions.getPosition(Location.from(Row.TWO, Col.C));
        expect(twoC.piece instanceof Pawn && twoC.piece.color == Color.WHITE).to.be.true;
        let twoD = positions.getPosition(Location.from(Row.TWO, Col.D));
        expect(twoD.piece instanceof Pawn && twoD.piece.color == Color.WHITE).to.be.true;
        let twoE = positions.getPosition(Location.from(Row.TWO, Col.E));
        expect(twoE.piece instanceof Pawn && twoE.piece.color == Color.WHITE).to.be.true;
        let twoF = positions.getPosition(Location.from(Row.TWO, Col.F));
        expect(twoF.piece instanceof Pawn && twoF.piece.color == Color.WHITE).to.be.true;
        let twoG = positions.getPosition(Location.from(Row.TWO, Col.G));
        expect(twoG.piece instanceof Pawn && twoG.piece.color == Color.WHITE).to.be.true;
        let twoH = positions.getPosition(Location.from(Row.TWO, Col.H));
        expect(twoH.piece instanceof Pawn && twoH.piece.color == Color.WHITE).to.be.true;

        let eightA = positions.getPosition(Location.from(Row.EIGHT, Col.A));
        expect(eightA.piece instanceof Rook && eightA.piece.color == Color.BLACK).to.be.true;
        let eightB = positions.getPosition(Location.from(Row.EIGHT, Col.B));
        expect(eightB.piece instanceof Knight && eightB.piece.color == Color.BLACK).to.be.true;
        let eightC = positions.getPosition(Location.from(Row.EIGHT, Col.C));
        expect(eightC.piece instanceof Bishop && eightC.piece.color == Color.BLACK).to.be.true;
        let eightD = positions.getPosition(Location.from(Row.EIGHT, Col.D));
        expect(eightD.piece instanceof Queen && eightD.piece.color == Color.BLACK).to.be.true;
        let eightE = positions.getPosition(Location.from(Row.EIGHT, Col.E));
        expect(eightE.piece instanceof King && eightE.piece.color == Color.BLACK).to.be.true;
        let eightF = positions.getPosition(Location.from(Row.EIGHT, Col.F));
        expect(eightF.piece instanceof Bishop && eightF.piece.color == Color.BLACK).to.be.true;
        let eightG = positions.getPosition(Location.from(Row.EIGHT, Col.G));
        expect(eightG.piece instanceof Knight && eightG.piece.color == Color.BLACK).to.be.true;
        let eightH = positions.getPosition(Location.from(Row.EIGHT, Col.H));
        expect(eightH.piece instanceof Rook && eightH.piece.color == Color.BLACK).to.be.true;
        let sevenA = positions.getPosition(Location.from(Row.SEVEN, Col.A));
        expect(sevenA.piece instanceof Pawn && sevenA.piece.color == Color.BLACK).to.be.true;
        let sevenB = positions.getPosition(Location.from(Row.SEVEN, Col.B));
        expect(sevenB.piece instanceof Pawn && sevenB.piece.color == Color.BLACK).to.be.true;
        let sevenC = positions.getPosition(Location.from(Row.SEVEN, Col.C));
        expect(sevenC.piece instanceof Pawn && sevenC.piece.color == Color.BLACK).to.be.true;
        let sevenD = positions.getPosition(Location.from(Row.SEVEN, Col.D));
        expect(sevenD.piece instanceof Pawn && sevenD.piece.color == Color.BLACK).to.be.true;
        let sevenE = positions.getPosition(Location.from(Row.SEVEN, Col.E));
        expect(sevenE.piece instanceof Pawn && sevenE.piece.color == Color.BLACK).to.be.true;
        let sevenF = positions.getPosition(Location.from(Row.SEVEN, Col.F));
        expect(sevenF.piece instanceof Pawn && sevenF.piece.color == Color.BLACK).to.be.true;
        let sevenG = positions.getPosition(Location.from(Row.SEVEN, Col.G));
        expect(sevenG.piece instanceof Pawn && sevenG.piece.color == Color.BLACK).to.be.true;
        let sevenH = positions.getPosition(Location.from(Row.SEVEN, Col.H));
        expect(sevenH.piece instanceof Pawn && sevenH.piece.color == Color.BLACK).to.be.true;
    });

    it("new boards don't have any defeated pieces", function () {
        let board = new Board();
        let defeatedPieces = board.defeatedPieces;

        expect(defeatedPieces.length).equals(0);
    });

    it("boards delegate calculateOutcome to outcomeEngine", function () {
        let aPlayer = getTwoPlayers()[0];
        let outEng = new OutcomeEngineSpy();
        let board = new Board(outEng);

        board.calculateOutcome(aPlayer, new Move(Location.from(Row.TWO, Col.B), Location.from(Row.THREE, Col.B)));

        expect(outEng.calculateOutcomeCalled).equals(1);
    });

    it("board is updated with defeated piece after move", function () {
        let aPlayer = getTwoPlayers()[0];
        let board = new Board(new OutcomeEngineSpy());

        let initialPositionsLength = board.positions.length();
        board.positions.move(Location.from(Row.TWO, Col.B), Location.from(Row.SIX, Col.B))
        board.calculateOutcome(aPlayer, new Move(Location.from(Row.SIX, Col.B), Location.from(Row.SEVEN, Col.A)));

        expect(board.defeatedPieces.length).equals(1);
        expect(board.positions.length()).equals(initialPositionsLength - 1);
    });

    it("board positions are updated after move", function () {
        let aPlayer = getTwoPlayers()[0];
        let board = new Board(new SimpleOutcomeEngine());
        let source = Location.from(Row.TWO, Col.B);
        let target = Location.from(Row.THREE, Col.B);

        let sourcePiece = board.positions.getPosition(source).piece;
        board.calculateOutcome(aPlayer, new Move(source, target));

        assert.equal(board.positions.getPosition(source), null);
        expect(board.positions.getPosition(target).piece).equals(sourcePiece);
    });

    it("move outcome contains updated board positions", function () {
        let players = getTwoPlayers();
        let game = new ChessMeGame(new Board(), players);

        let outcome = game.move(players[0], new Move(Location.from(Row.TWO, Col.E), Location.from(Row.FOUR, Col.E)));

        assert.isNotNull(outcome.positions);
        expect(outcome.positions.length()).equals(32);
        expect(outcome.positions.getPosition(Location.from(Row.FOUR, Col.E)).piece.name).equals("Pawn");
    });

    it("board positions have fixed colors", function () {
        let players = getTwoPlayers();
        let game = new ChessMeGame(new Board(), players);

        let outcome = game.move(players[0], new Move(Location.from(Row.TWO, Col.E), Location.from(Row.FOUR, Col.E)));
        assert.equal(outcome.positions.getPosition(Location.from(Row.FOUR, Col.E)).location.color, Color.WHITE);

        let outcome2 = game.move(players[1], new Move(Location.from(Row.EIGHT, Col.B), Location.from(Row.SIX, Col.C)));
        assert.equal(outcome2.positions.getPosition(Location.from(Row.SIX, Col.C)).location.color, Color.WHITE);
    });
});