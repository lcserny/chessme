import {ChessMeGame} from "./ChessMeGame";
import {Board} from "./Board";
import {Color, Player} from "./Player";
import {Move} from "./Move";
import {Col, Location, Row} from "./Position";

let game = new ChessMeGame(new Board());
let p1 = new Player("Player1", Color.WHITE);
let p2 = new Player("Player2", Color.BLACK);
game.join(p1);
game.join(p2);

game.move(p1, new Move(Location.from(Row.TWO, Col.D), Location.from(Row.FOUR, Col.D)));
game.move(p2, new Move(Location.from(Row.EIGHT, Col.B), Location.from(Row.SIX, Col.C)));
game.move(p1, new Move(Location.from(Row.ONE, Col.D), Location.from(Row.THREE, Col.D)));

let outcome1 = game.move(p2, new Move(Location.from(Row.SIX, Col.C), Location.from(Row.FOUR, Col.D)));
let p2CapturedPiece = outcome1.defeatedPosition.piece;
console.log(p2.name + " captured " + p2CapturedPiece.name + " " + p2CapturedPiece.color);

let outcome2 = game.move(p1, new Move(Location.from(Row.THREE, Col.D), Location.from(Row.FOUR, Col.D)));
let p1CapturedPiece = outcome2.defeatedPosition.piece;
console.log(p1.name + " captured " + p1CapturedPiece.name + " " + p1CapturedPiece.color);