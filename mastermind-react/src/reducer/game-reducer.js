import {evaluateMove, initializeGame} from "../utility/mastermind";

export default function gameReducer(game, action) {
    const newGame = {...game};
    switch (action.type) {
        case "PLAY":
            play(newGame);
            break;
        case "GUESS_CHANGED":
            newGame.guess = Number(action.event.target.value);
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
