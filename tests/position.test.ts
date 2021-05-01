import {expect} from "chai";
import {describe, it} from "mocha";
import {Col, Location, Row} from "../src/Position";

describe("position moves", function () {
    it("location moves up correctly on board", function () {
        let oneA = new Location(Row.ONE, Col.A);
        let twoA = oneA.up();

        expect(twoA.row).equals(Row.TWO);
        expect(twoA.col).equals(Col.A);

        let fourD = new Location(Row.FOUR, Col.D);
        let fiveD = fourD.up();

        expect(fiveD.row).equals(Row.FIVE);
        expect(fiveD.col).equals(Col.D);

        let eightF = new Location(Row.EIGHT, Col.F);
        let stillEightF = eightF.up();

        expect(stillEightF.row).equals(Row.EIGHT);
        expect(stillEightF.col).equals(Col.F);
    });

    it("location moves down correctly on board", function () {
        let eightB = new Location(Row.EIGHT, Col.B);
        let sevenB = eightB.down();

        expect(sevenB.row).equals(Row.SEVEN);
        expect(sevenB.col).equals(Col.B);

        let fourC = new Location(Row.FOUR, Col.C);
        let threeC = fourC.down();

        expect(threeC.row).equals(Row.THREE);
        expect(threeC.col).equals(Col.C);

        let oneH = new Location(Row.ONE, Col.H);
        let stillOneH = oneH.down();

        expect(stillOneH.row).equals(Row.ONE);
        expect(stillOneH.col).equals(Col.H);
    });

    it("location moves left correctly on board", function () {
        let oneH = new Location(Row.ONE, Col.H);
        let oneG = oneH.left();

        expect(oneG.row).equals(Row.ONE);
        expect(oneG.col).equals(Col.G);

        let sixF = new Location(Row.SIX, Col.F);
        let sixE = sixF.left();

        expect(sixE.row).equals(Row.SIX);
        expect(sixE.col).equals(Col.E);

        let fourA = new Location(Row.FOUR, Col.A);
        let stillFourA = fourA.left();

        expect(stillFourA.row).equals(Row.FOUR);
        expect(stillFourA.col).equals(Col.A);
    });

    it("location moves right correctly on board", function () {
        let twoA = new Location(Row.TWO, Col.A);
        let twoB = twoA.right();

        expect(twoB.row).equals(Row.TWO);
        expect(twoB.col).equals(Col.B);

        let fiveC = new Location(Row.FIVE, Col.C);
        let fiveD = fiveC.right();

        expect(fiveD.row).equals(Row.FIVE);
        expect(fiveD.col).equals(Col.D);

        let sevenH = new Location(Row.SEVEN, Col.H);
        let stillSevenH = sevenH.right();

        expect(stillSevenH.row).equals(Row.SEVEN);
        expect(stillSevenH.col).equals(Col.H);
    });
});