import Container from "./component/common/container";
import Card from "./component/common/card";
import CardHeader from "./component/common/card-header";
import CardBody from "./component/common/card-body";
import FormGroup from "./component/common/form-group";
import Label from "./component/common/label";
import Badge from "./component/common/badge";
import ProgressBar from "./component/common/progress-bar";
import InputText from "./component/common/input-text";
import Button from "./component/common/button";
import Table from "./component/common/table/table";
import TableHeader from "./component/common/table/table-header";
import TableBody from "./component/common/table/table-body";
import EvaluateMove from "./component/mastermind/evaluate-move";
import React, {useReducer} from "react";
import {initialGameState, initialStatisticsState} from "./utility/mastermind";
import gameReducer from "./reducer/game-reducer";
import statisticsReducer from "./reducer/statistics-reducer";


export default function MastermindStateless() {

    const [game, gameDispatcher] = useReducer(gameReducer, initialGameState);
    const [statistics, statisticsDispatcher] = useReducer(statisticsReducer, initialStatisticsState);

    function play(event) {
        gameDispatcher({type: "PLAY"}, event);
    }

    function handleInputChange(event) {
        gameDispatcher({type: "GUESS_CHANGED", event});
    }

    return (
        <Container id="mastermind">
            <Card id="gameConsole">
                <CardHeader title="Game Console"/>
                <CardBody>
                    <FormGroup>
                        <Label label="Game Level" htmlFor="gameLevel"/>
                        <Badge id="gameLevel" bgColor="bg-success" value={game.level}/>
                    </FormGroup>
                    <FormGroup>
                        <Label label="Lives" htmlFor="lives"/>
                        <Badge id="lives" bgColor="bg-primary" value={game.lives}/>
                    </FormGroup>
                    <FormGroup>
                        <Label label="Tries" htmlFor="tries"/>
                        <Badge id="tries" bgColor="bg-warning" value={game.tries}/>
                        <span className="form-label"> out of </span>
                        <Badge id="maxTries" bgColor="bg-danger" value={game.maxTries}/>
                    </FormGroup>
                    <FormGroup>
                        <Label label="Counter" htmlFor="counter"/>
                        <ProgressBar id="counter"
                                     value={game.counter}
                                     pbColor={game.pbColorCounter}
                                     pbWidth={game.pbWidthCounter}></ProgressBar>
                    </FormGroup>
                    <FormGroup>
                        <Label label="Guess" htmlFor="guess"/>
                        <InputText id="guess"
                                   value={game.guess}
                                   handleChange={handleInputChange}/>
                        <p></p>
                        <Button id="play" label="Play" bgColor="btn-success"
                                click={play}/>
                    </FormGroup>
                    <FormGroup>
                        <Table id="moves">
                            <TableHeader columns="ID,Guess,Message,Evaluation"/>
                            <TableBody>
                                {
                                    game.moves.map((move, index) =>
                                        <tr key={move.guess * index}>
                                            <td>{index + 1}</td>
                                            <td>{move.guess}</td>
                                            <td>{move.message}</td>
                                            <td><EvaluateMove move={move}/></td>
                                        </tr>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </FormGroup>
                </CardBody>
            </Card>
            <p></p>
            <Card id="gameStatistics">
                <CardHeader title="Game Statistics"/>
                <CardBody>
                    <FormGroup>
                        <Label label="Wins" htmlFor="wins"/>
                        <Badge id="wins" bgColor="bg-success" value={statistics.wins}/>
                    </FormGroup>
                    <FormGroup>
                        <Label label="Loses" htmlFor="loses"/>
                        <Badge id="loses" bgColor="bg-danger" value={statistics.loses}/>
                    </FormGroup>
                </CardBody>
            </Card>
        </Container>
    );
}