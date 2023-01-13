export const initialStatisticsState = {
    wins: 0,
    loses: 0
};
export const initialGameState = {
    level: 3,
    guess: createSecret(3),
    secret: createSecret(3),
    tries: 0,
    maxTries: 10,
    moves: [],
    counter: 60,
    lives: 3,
    pbColorCounter: "bg-primary",
    pbWidthCounter: "100%"
};
export default function createSecret(level) {
    const digits = [];
    digits.push(createRandomDigit(1, 9));
    while (digits.length < level) {
        const digit = createRandomDigit(0, 9);
        if (digits.includes(digit)) continue;
        digits.push(digit);
    }
    return Number(digits.join(''));
}

function createRandomDigit(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function initializeGame(game) {
    game.guess = createSecret(game.level);
    game.secret = createSecret(3);
    game.tries = 0;
    game.moves = [];
    game.counter = 60;
}

export function evaluateMove(guess, secret) {
    const guessAsString = guess.toString();
    const secretAsString = secret.toString();
    let perfectMatch = 0;
    let partialMatch = 0;
    //region find perfect and partial matches
    for (let i = 0; i < guessAsString.length; i++) {
        const g = guessAsString.charAt(i);
        for (let j = 0; j < secretAsString.length; j++) {
            const s = secretAsString.charAt(j);
            if (s === g) {
                if (i === j) {
                    perfectMatch++;
                } else {
                    partialMatch++;
                }
            }
        }
    }
    //endregion
    return new Move({guess, perfectMatch, partialMatch});
}

export class Move {
    constructor({guess, perfectMatch, partialMatch}) {
        this.guess = guess;
        this.perfectMatch = perfectMatch;
        this.partialMatch = partialMatch;
        this.message = "";
        if (perfectMatch === 0 && partialMatch === 0) {
            this.message = "No Match";
        } else {
            if (partialMatch > 0) {
                this.message = `-${partialMatch}`;
            }
            if (perfectMatch > 0) {
                this.message += `+${perfectMatch}`;
            }
        }
    }
}