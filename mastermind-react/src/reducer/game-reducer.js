import {evaluateMove, initializeGame} from "../utility/mastermind";

function decrementCounter(game) {
    game.counter--;
    game.pbWidthCounter = Math.round(game.counter * 5 / 3).toString().concat("%");
    if (game.counter <= 30)
        game.pbColorCounter = "bg-danger";
    else if (game.counter <= 45)
        game.pbColorCounter = "bg-warning";
    else
        game.pbColorCounter = "bg-primary";
}

export default function gameReducer(game, action) {
    const newGame = {...game};
    switch (action.type) {
        case "PLAY":
            play(newGame);
            break;
        case "GUESS_CHANGED":
            newGame.guess = Number(action.event.target.value);
            break;
        case "TIMEOUT":
            decrementCounter(newGame);
            if (newGame.counter <= 0) {
                if (newGame.lives === 0) {
                } else {
                    newGame.lives--;
                    initializeGame(newGame);
                }
            }
            break;
    }
    return newGame;
}

function play(game) {
    game.tries++;
    if (game.guess === game.secret) {
        game.level++;
        if (game.level > 10) {
        } else {
            initializeGame(game);
            game.lives++;
        }
    } else if (game.tries > game.maxTries) {
        game.lives--;
        if (game.lives === 0) {
        } else {
            initializeGame(game);
        }
    } else { // player has more tries
        game.moves.push(evaluateMove(game.guess, game.secret));
    }
}
