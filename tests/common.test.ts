import {assert} from "chai";
import {SimpleOutcomeEngine} from "../src/OutcomeEngine";
import {Positions} from "../src/Position";
import {Move} from "../src/Move";
import {Outcome} from "../src/Outcome";
import {Color, Player} from "../src/Player";

export class OutcomeEngineSpy extends SimpleOutcomeEngine{

    calculateOutcomeCalled = 0;

    calculateOutcome(player: Player, move: Move, positions: Positions): Outcome {
        this.calculateOutcomeCalled++;
        return super.calculateOutcome(player, move, positions);
    }

    updateCheckStates(player: Player, outcome: Outcome) {
        return super.updateCheckStates(player, outcome);
    }
}

export function getTwoPlayers(): Array<Player> {
    let players = new Array<Player>();
    players.push(new Player("p1", Color.WHITE));
    players.push(new Player("p2", Color.BLACK));
    return players;
}

export function assertError(errName: string, func: Function): void  {
    let err = new Error();
    try {
        func();
    } catch (e) {
        err = e;
    }
    assert.equal(err.name, errName)
}