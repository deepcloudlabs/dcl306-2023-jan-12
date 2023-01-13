import Container from "./component/common/container";
import React from "react";
import GameConsole from "./component/mastermind/game-console";
import GameStatistics from "./component/mastermind/game-statistics";


export default function MastermindStateless() {

    return (
        <Container id="mastermind">
            <GameConsole/>
            <p></p>
            <GameStatistics/>
        </Container>
    );
}