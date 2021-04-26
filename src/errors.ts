export class GameStatusError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "GameStatusError";
    }
}

export class NoPlayersError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoPlayersError";
    }
}

export class TooManyPlayersError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TooManyPlayersError";
    }
}

export class SamePlayerTeamError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SamePlayerTeamError";
    }
}