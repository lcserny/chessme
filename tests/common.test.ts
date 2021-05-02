import {assert} from "chai";

export function assertError(errName: string, func: Function): void  {
    let err = new Error();
    try {
        func();
    } catch (e) {
        err = e;
    }
    assert.equal(err.name, errName)
}