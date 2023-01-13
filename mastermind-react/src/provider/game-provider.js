import {createContext, useContext, useReducer} from "react";
import gameReducer from "../reducer/game-reducer";
import {initialGameState, initialStatisticsState} from "../utility/mastermind";
import statisticsReducer from "../reducer/statistics-reducer";
import MastermindStateless from "../mastermind-stateless";

export const GameContext = createContext(null);
export const StatisticsContext = createContext(null);

export function useGame() {
    const {game} = useContext(GameContext);
    return game;
}

export function useGameDispatcher() {
    const {gameDispatcher} = useContext(GameContext);
    return gameDispatcher;
}

export function useMoves() {
    const {game} = useContext(GameContext);
    return game.moves;
}

export function useStatistics() {
    const {statistics} = useContext(StatisticsContext);
    return statistics;
}

export default function GameProvider() {
    const [game, gameDispatcher] = useReducer(gameReducer, initialGameState);
    const [statistics, statisticsDispatcher] = useReducer(statisticsReducer, initialStatisticsState);

    return (
        <GameContext.Provider value={{game, gameDispatcher}}>
            <StatisticsContext.Provider value={{statistics, statisticsDispatcher}}>
                <MastermindStateless></MastermindStateless>
            </StatisticsContext.Provider>
        </GameContext.Provider>
    )
}