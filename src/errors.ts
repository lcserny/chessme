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

export class PlayerNotInGameError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PlayerNotInGameError";
    }
}

export class PlayerNameExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PlayerNameExistsError";
    }
}

export class PlayerTurnError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PlayerTurnError";
    }
}

export class IllegalMoveError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "IllegalMoveError";
    }
}

export class PieceNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PieceNotFoundError";
    }
}